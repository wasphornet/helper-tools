import React, { useEffect, useState } from "react"
import QRCode from "react-qr-code"

const DeeplinkGenerator = () => {
    const [isEncrypt, setIsEncrypt] = useState<boolean>(true)
    const [result, setResult] = useState<string>()
    const [basePath, setBasePath] = useState<string>()
    const [params, setParams] = useState<string>()
    console.log("🐯 ~ file: index.tsx:7 ~ DeeplinkGenerator ~ isEncrypt:", isEncrypt)

    const onChangeValue = (key: string, value: string) => {
        switch (key) {
            case 'basePath':
                setBasePath(value)
                break
            case 'params':
                setParams(value)
                break
        }
    }

    useEffect(() => {
        if (!basePath || !params) return
        if (isEncrypt) {
            const base64 = btoa(params)
            setResult(`${basePath}?params=${base64}`)
        } else {
            setResult(`${basePath}?params=${params}`)
        }
    }, [basePath, params, isEncrypt])

    return (
        <div id="deeplink-generator-wrapper" className="min-w-full">
            <p className="text-xl">Deeplink Generator</p>
            <div id="content-wrapper" className="my-5">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <p className="text-lg mb-2">Base path</p>
                        <input
                            type="text"
                            placeholder="Base path"
                            className="input input-bordered w-full"
                            value={basePath}
                            onChange={(e) => onChangeValue('basePath', e?.target?.value)}
                        />
                    </div>
                    <div>
                        <p className="text-lg mb-2">Params</p>
                        <input
                            type="text"
                            placeholder="Params"
                            className="input input-bordered w-full"
                            value={params}
                            onChange={(e) => onChangeValue('params', e?.target?.value)}
                        />
                        <label className="label cursor-pointer">
                            <span className="label-text">Encrypt Base 64</span>
                            <input
                                type="checkbox"
                                className="toggle"
                                checked={isEncrypt}
                                onClick={() => setIsEncrypt(!isEncrypt)}
                            />
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-3">
                        <p className="text-lg mb-2">Result path</p>
                        <textarea
                            className="textarea textarea-info min-w-full"
                            rows={5}
                            placeholder="Result path"
                            value={result}
                            readOnly
                        />
                    </div>
                    <div className="col-span-2 h-full">
                        <p className="text-lg mb-2">Preview QR Code</p>
                        <div className="bg-white p-3 flex justify-center align-middle h-fit">
                            {result && <QRCode style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={result} />}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DeeplinkGenerator
