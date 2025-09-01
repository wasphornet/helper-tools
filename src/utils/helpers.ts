const publicKey = `${process.env.NEXT_PUBLIC_RSA_PUBLIC_KEY}`
const privateKey = `${process.env.RSA_PRIVATE_KEY}`

export const firstUpperCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
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