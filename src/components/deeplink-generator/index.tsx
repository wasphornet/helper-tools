import React, { useEffect, useState } from "react"
import QRCode from "react-qr-code"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const DeeplinkGenerator = () => {
    const [isEncode, setIsEncode] = useState<boolean>(true)
    const [result, setResult] = useState<string>()
    const [basePath, setBasePath] = useState<string>()
    const [params, setParams] = useState<string>()
    const [isAdvanceMode, setIsAdvanceMode] = useState<boolean>(false)
    const [urlParams, setUrlParams] = useState<{
        key: string
        value: string
    }[]>([
        { key: '', value: '' }
    ])


    const onChangeValue = (key: string, value: string) => {
        switch (key) {
            case 'basePath':
                setBasePath(value)
                break
            case 'params':
                setParams(value)
                break
            case 'result':
                setResult(value)
                break
        }
    }

    useEffect(() => {
        if (!basePath || !isAdvanceMode) return

        if (!params && !urlParams?.length) {
            setResult(basePath)
            return
        }

        let joinParams = ''
        if (urlParams.length > 0) {
            const joinUrlParams = urlParams.map((param) => {
                if (!param.key || !param.value) return ''
                const encodeUrl = encodeURIComponent(param.value)
                return `${param.key}=${encodeUrl}`
            }).reduce((acc, curr) => {
                return curr ? `${acc}&${curr}` : acc
            })
            console.log("🐯 ~ file: index.tsx:49 ~ joinUrlParams ~ joinUrlParams:", joinUrlParams)
            joinParams = String(joinUrlParams)
        }

        if (params) {
            joinParams = joinParams ? `${joinParams}&${params}` : params
        }
        console.log("🐯 ~ file: index.tsx:56 ~ useEffect ~ joinParams:", joinParams)

        if (isEncode) {
            const base64 = btoa(joinParams)
            setResult(`${basePath}?data=${base64}`)
        } else {
            setResult(`${basePath}?${joinParams}`)
        }
    }, [basePath, params, isEncode, isAdvanceMode, JSON.stringify(urlParams)])

    const onChangeURLParams = (index: number, key: string, value: string) => {
        let newParams = [...urlParams]
        newParams[index] = {
            ...newParams[index],
            [key]: value
        }
        setUrlParams(newParams)
    }

    const generateParamsInput = () => {
        return urlParams?.map((param, index) => {
            const { key, value } = param
            return (
                <div key={index} className="grid grid-cols-10 gap-5 mb-3">
                    <input
                        type="text"
                        placeholder="Key"
                        className="input input-bordered w-full col-span-3"
                        value={key}
                        onChange={(e) => onChangeURLParams(index, 'key', e?.target?.value)}
                    />
                    <input
                        type="text"
                        placeholder="Value"
                        className="input input-bordered w-full col-span-7"
                        value={value}
                        onChange={(e) => onChangeURLParams(index, 'value', e?.target?.value)}
                    />
                </div>
            )
        })
    }

    const addURLParam = () => {
        setUrlParams([...urlParams, { key: '', value: '' }])
    }

    const removeLastURLParam = () => {
        if (urlParams.length === 1) return
        const newParams = [...urlParams]
        newParams.pop()
        setUrlParams(newParams)
    }

    return (
        <div id="deeplink-generator-wrapper" className="min-w-full">
            <p className="text-xl">QR Deeplink Generator</p>
            <div id="content-wrapper" className="my-5">
                <div id="basic-options">
                    <div className="md:grid grid-cols-10 gap-5 pt-3">
                        <div className="col-span-6 flex flex-col">
                            <p className="text-lg mb-2">Result path {isAdvanceMode && '(Read Only)'}</p>
                            <textarea
                                className="textarea textarea-info min-w-full h-full"
                                placeholder="Result path"
                                rows={5}
                                value={result}
                                onChange={(e) => onChangeValue('result', e?.target?.value)}
                                readOnly={isAdvanceMode}
                            />
                        </div>

                        <div className="col-span-4 flex flex-col text-center">
                            <p className="text-lg mb-2">Preview QR Code</p>
                            <div className={`w-auto h-full flex justify-center`}>
                                {result && (<div className="bg-white p-3">
                                    <QRCode className="w-auto h-full" value={result} />
                                </div>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <label className="label cursor-pointer gap-3 px-0">
                            <span className="label-text">Advance mode</span>
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={isAdvanceMode}
                                onClick={() => {
                                    setIsAdvanceMode(!isAdvanceMode)
                                    setBasePath('')
                                    setParams('')
                                    setUrlParams([{ key: '', value: '' }])
                                }}
                            />
                        </label>
                    </div>
                </div>
                {isAdvanceMode && (
                    <div id="advance-options" className="my-5">
                        <div className="mb-3">
                            <p className="text-lg mb-3">Base path</p>
                            <input
                                type="text"
                                placeholder="Base path"
                                className="input input-bordered w-full"
                                value={basePath}
                                onChange={(e) => onChangeValue('basePath', e?.target?.value)}
                            />
                        </div>

                        <div className="flex">
                            <label className="label cursor-pointer gap-3 px-0">
                                <span className="label-text">Encrypt Params to Base 64</span>
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={isEncode}
                                    onClick={() => setIsEncode(!isEncode)}
                                />
                            </label>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <p className="text-lg mb-3">Params (Example: name=bobby&age=20)</p>
                                <input
                                    type="text"
                                    placeholder="Params"
                                    className="input input-bordered w-full"
                                    value={params}
                                    onChange={(e) => onChangeValue('params', e?.target?.value)}
                                />
                            </div>
                            <div>
                                <div className="flex justify-start align-middle gap-3">
                                    <p className="text-lg mb-3">URL Params</p>
                                    <button
                                        className="btn btn-sm btn-success "
                                        onClick={() => addURLParam()}
                                    >
                                        <AddIcon />
                                    </button>

                                    <button
                                        className="btn btn-sm btn-error "
                                        onClick={() => removeLastURLParam()}
                                    >
                                        <RemoveIcon />
                                    </button>
                                </div>
                                {generateParamsInput()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}

export default DeeplinkGenerator
