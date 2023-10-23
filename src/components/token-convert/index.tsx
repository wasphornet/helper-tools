import React, { useState } from "react"
import template from '@/templates/convert-token.json'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TransformIcon from '@mui/icons-material/Transform';
import ClearIcon from '@mui/icons-material/Clear';


const TokenConvert = () => {
    const { template_string: templateString, mapping_key: mappingKey } = template || {}
    const [jsonText, setJsonText] = useState('')
    const [result, setResult] = useState('')
    const [error, setError] = useState(false)

    const onClickConvert = () => {
        if (!jsonText) return
        console.log("🚀 ~ file: index.tsx:12 ~ onClickConvert ~ jsonText:", jsonText)

        try {
            const json = JSON.parse(jsonText)
            const data = json?.data || {}
            if (!data || !Object.keys(data).length) {
                setError(true)
                return
            }
            let notFoundKey = false
            let newString = templateString
            mappingKey.forEach((item: { key: string, replace_key: string }) => {
                const { key, replace_key } = item || {}
                if (!key || !replace_key || !data?.[key]) {
                    notFoundKey = true
                } else {
                    newString = newString.replace(replace_key, data?.[key])
                }
            })
            if (notFoundKey) {
                setError(true)
            } else {
                setResult(newString)
            }
        } catch (error) {
            setError(true)
        }
    }

    return (
        <div id="token-convert-wrapper" className="min-w-full">
            <p className="text-xl">Token Convert</p>
            <div id="content-wrapper" className="grid gap-5 my-5">
                {error && <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Is invalid data or incorrect format</span>
                </div>}
                <textarea
                    className="textarea textarea-info text-white min-w-full"
                    rows={5}
                    placeholder="Bio"
                    value={jsonText}
                    onChange={(e) => {
                        setError(false)
                        setJsonText(e.target.value)
                    }}
                />
                <div id="button-wrapper" className="flex gap-5 justify-center">
                    <button
                        id="clear-button"
                        className="flex-auto btn btn-active btn-error"
                        onClick={() => {
                            setJsonText('')
                            setResult('')
                        }}
                    >
                        <ClearIcon />
                        Clear
                    </button>
                    <button
                        id="convert-button"
                        className="flex-auto btn btn-active btn-success"
                        onClick={onClickConvert}
                        disabled={!templateString || !mappingKey?.length}
                    >
                        <TransformIcon />
                        Convert
                    </button>
                    <button
                        id="copy-button"
                        className="flex-auto btn btn-active btn-primary"
                        onClick={() => {
                            navigator.clipboard.writeText(result)
                        }}
                    >
                        <ContentCopyIcon />
                        Copy
                    </button>
                </div>
                <div id="result-textarea-wrapper">
                    <textarea
                        className="textarea textarea-info text-white min-w-full"
                        rows={5}
                        placeholder="Bio"
                        value={result}
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}

export default TokenConvert