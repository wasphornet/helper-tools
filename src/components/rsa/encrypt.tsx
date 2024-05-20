import React, { useState } from "react"
import JSEncrypt from 'jsencrypt'
import TextareaWithButton from 'components/@shared/textarea-with-button'

const EncryptRSA = () => {
    const encrypt = new JSEncrypt()
    const key = 'qrE9K'

    const [encryptKey, setEncryptKey] = useState<string>('')
    const [encryptValue, setEncryptValue] = useState<string>('')
    const [encryptResult, setEncryptResult] = useState<string>('')

    const setChangeValue = (key: string, text: string) => {
        switch (key) {
            case 'encryptKey':
                setEncryptKey(text)
                break
            case 'encryptValue':
                setEncryptValue(text)
                break
            case 'encryptResult':
                setEncryptResult(text)
                break
        }
    }

    const onEncryptValue = () => {
        encrypt.setPublicKey(encryptKey)
        const result = encrypt.encrypt(encryptValue)
        if (!result) {
            setChangeValue('encryptResult', 'Encrypt failed')
        } else {
            setChangeValue('encryptResult', result.toString())
        }
    }

    return (
        <div id="token-convert-wrapper" className="min-w-full">
            <p className="text-xl">Encrypt RSA</p>
            <div id="content-wrapper" className="grid gap-5 my-5 pt-3">
                <p className="text-l">Encrypt Key</p>
                <TextareaWithButton
                    key={key}
                    storageKey={key}
                    rows={3}
                    value={encryptKey}
                    placeholder="Encrypt Key"
                    onChange={(value: any) => setChangeValue('encryptKey', value)}
                />
                <p className="text-l">Encrypt Value</p>
                <textarea
                    className="textarea textarea-info min-w-full"
                    rows={2}
                    placeholder="Encrypt Value"
                    value={encryptValue}
                    onChange={(e) => setChangeValue('encryptValue', e?.target?.value)}
                />
                <div id="button-wrapper" className="flex gap-5 justify-center">
                    <button
                        id="clear-button"
                        className="flex-auto btn btn-active btn-primary"
                        onClick={onEncryptValue}
                    >
                        Encrypt Value
                    </button>
                </div>
                <div id="result-textarea-wrapper">
                    <textarea
                        className="textarea textarea-info text-white min-w-full"
                        rows={3}
                        placeholder="Encrypt Result"
                        value={encryptResult}
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}

export default EncryptRSA