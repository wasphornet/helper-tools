import { useState } from 'react'
import QRCode from 'react-qr-code'

const QRGenerator = () => {
  const [result, setResult] = useState<string>()

  return (
    <div id='qr-generator-wrapper' className='min-w-full'>
      <p className='text-xl'>QR Generator</p>
      <div id='content-wrapper' className='my-5'>
        <div id='basic-options'>
          <div className='md:grid grid-cols-10 gap-5 pt-3'>
            <div className='col-span-6 flex flex-col'>
              <p className='text-lg mb-2'>Value to generate QR code</p>
              <textarea
                className='textarea textarea-info min-w-full h-full'
                placeholder='Value to generate'
                rows={5}
                value={result}
                onChange={(e) => setResult(e?.target?.value || '')}
              />
            </div>

            <div className='col-span-4 flex flex-col text-center'>
              <p className='text-lg mb-2'>Preview QR Code</p>
              <div className={`w-auto h-full flex justify-center`}>
                {result && (
                  <div className='bg-white p-3'>
                    <QRCode className='w-auto h-full' value={result} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRGenerator
