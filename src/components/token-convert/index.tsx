import React, { useState } from 'react'
import template from 'templates/convert-token.json'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ClearIcon from '@mui/icons-material/Clear'
import { useToast } from 'hooks/useToast'

const TokenConvert = () => {
  const { template_string: templateString, mapping_key: mappingKey } = template || {}
  const [jsonText, setJsonText] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const toast = useToast()

  const convertAndClear = () => {
    if (!jsonText) return

    try {
      const json = JSON.parse(jsonText)
      const data = json?.data || {}
      if (!data || !Object.keys(data).length) {
        toast.error('Invalid data or incorrect format')
        return
      }
      let notFoundKey = false
      let newString = templateString
      mappingKey.forEach((item: { key: string; replace_key: string }) => {
        const { key, replace_key } = item || {}
        if (!key || !replace_key || !data?.[key]) {
          notFoundKey = true
        } else {
          newString = newString.replace(replace_key, data?.[key])
        }
      })
      if (notFoundKey) {
        toast.error('Invalid data or incorrect format')
      } else {
        setResult(newString)
        copyToClipboard(newString)
      }
    } catch (error) {
      toast.error('Invalid data or incorrect format')
    }
  }

  const copyToClipboard = async (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const clearAndPaste = async () => {
    const text = await navigator.clipboard.readText()
    setJsonText(text)
    toast.info('Pasted from clipboard')
  }

  const onChangeTextarea = (value: string) => {
    setJsonText(value)
  }

  return (
    <div id='token-convert-wrapper' className='min-w-full grid gap-5 my-5'>
      <textarea
        className='textarea textarea-info min-w-full'
        rows={5}
        placeholder='Response JSON'
        value={jsonText}
        onChange={(e) => onChangeTextarea(e?.target?.value)}
      />
      <div id='button-wrapper' className='flex gap-5 justify-center'>
        <button
          id='clear-button'
          className='flex-auto btn btn-active btn-error'
          onClick={clearAndPaste}
        >
          <ClearIcon />
          Clear & Paste
        </button>
        <button
          id='convert-button'
          className='flex-auto btn btn-active btn-success'
          onClick={convertAndClear}
          disabled={!templateString || !mappingKey?.length}
        >
          <ContentCopyIcon />
          Convert & Copy
        </button>
      </div>
      <div id='result-textarea-wrapper'>
        <textarea
          className='textarea textarea-info text-white min-w-full'
          rows={5}
          placeholder='Result'
          value={result}
          readOnly
        />
      </div>
    </div>
  )
}

export default TokenConvert
