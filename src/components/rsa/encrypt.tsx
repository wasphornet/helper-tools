import React, { useState } from 'react'
import JSEncrypt from 'jsencrypt'

interface EncryptRSAProps {
  encryptKey: string
}

const EncryptRSA = ({ encryptKey }: EncryptRSAProps) => {
  const encrypt = new JSEncrypt()

  const [encryptValue, setEncryptValue] = useState<string>('')
  const [encryptResult, setEncryptResult] = useState<string>('')

  const setChangeValue = (key: string, text: string) => {
    switch (key) {
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
    <div id='token-convert-wrapper' className='min-w-full'>
      <div id='content-wrapper' className='grid gap-5 py-5'>
        <p className='text-l'>Encrypt Value</p>
        <textarea
          className='textarea textarea-info min-w-full'
          rows={2}
          placeholder='Encrypt Value'
          value={encryptValue}
          onChange={(e) => setChangeValue('encryptValue', e?.target?.value)}
        />
        <div id='button-wrapper' className='flex gap-5 justify-center'>
          <button
            id='clear-button'
            className='flex-auto btn btn-active btn-primary'
            onClick={onEncryptValue}
          >
            Encrypt Value
          </button>
        </div>
        <div id='result-textarea-wrapper'>
          <textarea
            className='textarea textarea-info text-white min-w-full'
            rows={3}
            placeholder='Encrypt Result'
            value={encryptResult}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default EncryptRSA
