import React, { useState } from 'react'
import { decodeBase64, encodeBase64 } from 'utils/helpers'

const Base64Tool = () => {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const onEncode = () => {
    if (!input) return
    setError(false)
    setOutput(encodeBase64(input))
  }

  const onDecode = () => {
    if (!input) return
    const result = decodeBase64(input)
    if (result === null) {
      setError(true)
      setOutput('')
      return
    }
    setError(false)
    setOutput(result)
  }

  return (
    <div id='base64-wrapper' className='min-w-full'>
      <p className='text-xl'>Encode/Decode Base64</p>
      <div id='content-wrapper' className='grid gap-5 my-5 pt-3'>
        {error && (
          <div className='alert alert-error'>
            <span>Invalid Base64 string</span>
          </div>
        )}
        <textarea
          className='textarea textarea-info min-w-full'
          rows={5}
          placeholder='Input text or Base64'
          value={input}
          onChange={(e) => {
            setError(false)
            setInput(e.target.value)
          }}
        />
        <div id='button-wrapper' className='flex gap-5 justify-center'>
          <button className='flex-auto btn btn-active btn-primary' onClick={onEncode}>
            Encode
          </button>
          <button className='flex-auto btn btn-active btn-secondary' onClick={onDecode}>
            Decode
          </button>
        </div>
        <textarea
          className='textarea textarea-info text-white min-w-full'
          rows={5}
          placeholder='Result'
          value={output}
          readOnly
        />
      </div>
    </div>
  )
}

export default Base64Tool
