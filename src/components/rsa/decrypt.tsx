import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import JSEncrypt from 'jsencrypt'

import { showToaster } from 'reduxs/toast-redux'

interface DecryptRSAProps {
  decryptKey: string
}

const DecryptRSA = ({ decryptKey }: DecryptRSAProps) => {
  const dispatch = useDispatch()
  const encrypt = new JSEncrypt()

  const [decryptValue, setDecryptValue] = useState<string>('')
  const [decryptResult, setDecryptResult] = useState<string>('')

  const setChangeValue = (key: string, text: string) => {
    switch (key) {
      case 'decryptValue':
        setDecryptValue(text)
        break
      case 'decryptResult':
        setDecryptResult(text)
        break
    }
  }

  const onDecryptValue = () => {
    if (!decryptKey || !decryptValue) {
      dispatch(
        showToaster({
          type: 'error',
          message: 'Please fill in the input fields'
        })
      )
      return
    }
    encrypt.setPrivateKey(decryptKey)
    const result = encrypt.decrypt(decryptValue)
    if (!result) {
      setChangeValue('decryptResult', '')
      dispatch(
        showToaster({
          type: 'error',
          message: 'Decrypt failed'
        })
      )
    } else {
      setChangeValue('decryptResult', result.toString())
      dispatch(
        showToaster({
          type: 'success',
          message: 'Decrypt success'
        })
      )
    }
  }

  return (
    <div id='token-convert-wrapper' className='min-w-full'>
      <div id='content-wrapper' className='grid gap-5'>
        <p className='text-l'>Decrypt Value</p>
        <textarea
          className='textarea textarea-info min-w-full'
          rows={2}
          placeholder='Decrypt Value'
          value={decryptValue}
          onChange={(e) => setChangeValue('decryptValue', e?.target?.value)}
        />
        <div id='button-wrapper' className='flex gap-5 justify-center'>
          <button
            id='clear-button'
            className='flex-auto btn btn-active btn-primary'
            onClick={onDecryptValue}
          >
            Decrypt Value
          </button>
        </div>
        <div id='result-textarea-wrapper'>
          <textarea
            className='textarea textarea-info text-white min-w-full'
            rows={3}
            placeholder='Decrypt Result'
            value={decryptResult}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default DecryptRSA
