import React, { useEffect } from 'react'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { decryptRSA, encryptRSA } from 'utils/helpers'


const TextareaWithButton = ({
    storageKey,
    value,
    onChange,
    rows = 3,
    placeholder = 'enter value',
}: any) => {
    
    const saveToLocalStorage = () => {
        console.log("🐯 ~ file: textarea-with-button.tsx:20 ~ saveToLocalStorage ~ storageKey:", storageKey)
        console.log("🐯 ~ file: decrypt.tsx:64 ~ saveToLocalStorage ~ value:", value)
        if (!value) return
        const encValue = btoa(value)
        console.log("🐯 ~ file: decrypt.tsx:67 ~ saveToLocalStorage ~ encValue:", encValue)
        localStorage.setItem(storageKey, encValue)
    }

    const onClearLocalStorage = () => {
        localStorage.removeItem(storageKey)
        onChange('')
    }
    
    useEffect(() => {
        const localValue = localStorage.getItem(storageKey)
        if (localValue) {
            const decValue = atob(localValue)
            onChange(decValue)
        }
    }, [])

    return (
        <div className="relative m-0 p-0">
            <div className='absolute right-3 top-3 flex gap-3'>
                <button
                    className="btn btn-sm btn-success "
                    onClick={() => saveToLocalStorage()}
                >
                    <SaveAsIcon />
                </button>
                <button
                    className="btn btn-sm btn-error "
                    onClick={() => onClearLocalStorage()}
                >
                    <DeleteForeverIcon />
                </button>
            </div>
            <textarea
                className="textarea textarea-info min-w-full"
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default TextareaWithButton
