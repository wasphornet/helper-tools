import React, { useState } from 'react'
import template from 'templates/convert-token.json'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ClearIcon from '@mui/icons-material/Clear'
import { useToast } from 'hooks/useToast'

const ConvertTextFormat = () => {
  const { template_string: templateString, mapping_key: mappingKey } = template || {}
  const [jsonText, setJsonText] = useState<string>('')
  const [result, setResult] = useState<string>('')
  const toast = useToast()

  const convertAndClear = () => {
    if (!jsonText) return

    try {
      const data = JSON.parse(jsonText)
      if (!data?.customer) {
        toast.error('Invalid data or incorrect format')
        return
      }
      const rm_id = data?.customer?.profile?.rm_id
      const product_holdings = data?.customer?.product_holdings
      const {
        saving_accounts,
        current_accounts,
        loan_accounts,
        hire_purchase_accounts,
        mutual_fund_accounts,
        structured_note_accounts
      } = product_holdings

      const merge_array = [
        ...saving_accounts,
        ...current_accounts,
        ...loan_accounts,
        ...hire_purchase_accounts,
        ...mutual_fund_accounts,
        ...structured_note_accounts
      ]

      const result = merge_array?.map((item) => {
        return `${rm_id},${item.product_code},${item.acct_nbr}`
      })
      const text = result.join('\n')

      if (!text) {
        toast.error('Invalid data or incorrect format')
      } else {
        setResult(text)
        copyToClipboard(text)
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
        placeholder='Bio'
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
          placeholder='Bio'
          value={result}
          readOnly
        />
      </div>
    </div>
  )
}

export default ConvertTextFormat
