import React, { useEffect } from 'react'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { secureGet, secureRemove, secureSet } from 'utils/secureStorage'

const TextareaWithButton = ({
  storageKey,
  value,
  onChange,
  rows = 3,
  placeholder = 'enter value'
}: any) => {
  const saveToLocalStorage = async () => {
    if (!value) return
    await secureSet(storageKey, value)
  }

  const onClearLocalStorage = () => {
    secureRemove(storageKey)
    onChange('')
  }

  useEffect(() => {
    secureGet(storageKey).then((stored) => {
      if (stored) onChange(stored)
    })
  }, [])

  return (
    <div className='relative m-0 p-0'>
      <div className='absolute right-3 top-3 flex gap-3'>
        <button className='btn btn-sm btn-success ' onClick={() => saveToLocalStorage()}>
          <SaveAsIcon />
        </button>
        <button className='btn btn-sm btn-error ' onClick={() => onClearLocalStorage()}>
          <DeleteForeverIcon />
        </button>
      </div>
      <textarea
        className='textarea textarea-info min-w-full'
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default TextareaWithButton
