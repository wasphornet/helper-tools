const publicKey = `${process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY}`
const privateKey = `${process.env.RSA_PRIVATE_KEY}`

export const firstUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const snakeToPascal = (string: string) => {
  return string
    .split('/')
    .map((snake) =>
      snake
        .split('_')
        .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
        .join('')
    )
    .join('/')
}

export const encryptRSA = (value: string) => {
  const JSEncrypt = require('jsencrypt').JSEncrypt
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  const result = encrypt.encrypt(value)
  return result
}

export const decryptRSA = (value: string) => {
  const JSEncrypt = require('jsencrypt').JSEncrypt
  const encrypt = new JSEncrypt()
  encrypt.setPrivateKey(privateKey)
  const result = encrypt.decrypt(value)
  return result
}

export const encodeBase64 = (value: string): string => {
  const bytes = new TextEncoder().encode(value)
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')
  return btoa(binary)
}

export const decodeBase64 = (value: string): string | null => {
  try {
    const binary = atob(value.trim())
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    return null
  }
}
