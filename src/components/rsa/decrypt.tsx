import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import JSEncrypt from 'jsencrypt'

import { showToaster } from 'reduxs/toast-redux'
import Toaster from 'components/@shared/toaster'
import TextareaWithButton from 'components/@shared/textarea-with-button'

const DecryptRSA = () => {
  const dispatch = useDispatch()
  const encrypt = new JSEncrypt()
  const key = 'u5CBn'

  const [decryptValue, setDecryptValue] = useState<string>('')
  const [decryptKey, setDecryptKey] = useState<string>('')
  const [decryptResult, setDecryptResult] = useState<string>('')

  const setChangeValue = (key: string, text: string) => {
    switch (key) {
      case 'decryptKey':
        setDecryptKey(text)
        break
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
      <Toaster />
      <p className='text-xl'>Decrypt RSA</p>
      <div id='content-wrapper' className='grid gap-5 my-5 pt-3'>
        <p className='text-l'>Decrypt Key</p>
        <TextareaWithButton
          key={key}
          storageKey={key}
          rows={3}
          value={decryptKey}
          placeholder='Decrypt Key'
          onChange={(value: any) => setChangeValue('decryptKey', value)}
        />
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
            placeholder='Encrypt Result'
            value={decryptResult}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default DecryptRSA
