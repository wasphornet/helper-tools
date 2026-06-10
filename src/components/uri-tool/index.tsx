import React, { useState } from 'react'
import { decodeURIString, encodeURIString } from 'utils/helpers'
import { useToast } from 'hooks/useToast'

const URITool = () => {
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const toast = useToast()

  const onEncode = () => {
    if (!input) return
    setOutput(encodeURIString(input))
  }

  const onDecode = () => {
    if (!input) return
    const result = decodeURIString(input)
    if (result === null) {
      toast.error('Invalid URI string')
      setOutput('')
      return
    }
    setOutput(result)
  }

  return (
    <div id='uri-wrapper' className='min-w-full grid gap-5 my-5'>
      <textarea
        className='textarea textarea-info min-w-full'
        rows={5}
        placeholder='Input text or URI'
        value={input}
        onChange={(e) => {
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
  )
}

export default URITool
