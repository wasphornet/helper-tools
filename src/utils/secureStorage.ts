/**
 * secureStorage — client-side only
 *
 * Values are encrypted with AES-GCM-256 before being written to localStorage.
 * The encryption key is a non-extractable CryptoKey generated once per device
 * and persisted in IndexedDB, meaning its raw bytes are never accessible to JS.
 */

const DB_NAME = 'ht-secure-store'
const STORE_NAME = 'device-keys'
const DEVICE_KEY_ID = 'aes-gcm-device-key'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function getOrCreateDeviceKey(): Promise<CryptoKey> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const getReq = store.get(DEVICE_KEY_ID)

    getReq.onsuccess = async () => {
      if (getReq.result) {
        resolve(getReq.result as CryptoKey)
        return
      }
      try {
        const key = await crypto.subtle.generateKey(
          { name: 'AES-GCM', length: 256 },
          false, // non-extractable: raw bytes cannot be read by JS
          ['encrypt', 'decrypt']
        )
        store.put(key, DEVICE_KEY_ID)
        resolve(key)
      } catch (err) {
        reject(err)
      }
    }
    getReq.onerror = () => reject(getReq.error)
  })
}

/** Encrypt and persist a value under the given localStorage key. */
export async function secureSet(storageKey: string, value: string): Promise<void> {
  const deviceKey = await getOrCreateDeviceKey()
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoded = new TextEncoder().encode(value)

  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, deviceKey, encoded)

  // Pack iv (12 bytes) + ciphertext, then base64-encode for localStorage
  const combined = new Uint8Array(iv.byteLength + ciphertext.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(ciphertext), iv.byteLength)

  // Use chunked String.fromCharCode to avoid call-stack limits on large keys
  const chars: string[] = []
  combined.forEach((b) => chars.push(String.fromCharCode(b)))
  localStorage.setItem(storageKey, btoa(chars.join('')))
}

/** Retrieve and decrypt a value, or null if absent / tampered. */
export async function secureGet(storageKey: string): Promise<string | null> {
  const raw = localStorage.getItem(storageKey)
  if (!raw) return null

  try {
    const deviceKey = await getOrCreateDeviceKey()
    const combined = Uint8Array.from(atob(raw), (c) => c.charCodeAt(0))
    const iv = combined.slice(0, 12)
    const ciphertext = combined.slice(12)

    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, deviceKey, ciphertext)
    return new TextDecoder().decode(plaintext)
  } catch {
    // Tampered, wrong device key, or legacy Base64-only value — discard
    localStorage.removeItem(storageKey)
    return null
  }
}

/** Remove the value from localStorage. */
export function secureRemove(storageKey: string): void {
  localStorage.removeItem(storageKey)
}
