import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'
import { snakeToPascal } from 'utils/helpers'

const JsonToInterface = () => {
  const [value, setValue] = useState<string>()
  const [result, setResult] = useState<string>()

  const createInterfaceFromObject = (obj: any, interfaceName: string): string => {
    let interfaceString = `interface ${interfaceName} {\n`
    for (const key in obj) {
      const value = obj[key]
      let valueType: any = typeof value
      if (!value) {
        switch (value) {
          case '':
          case '0':
            valueType = 'string'
            break
          case 0:
            valueType = 'number'
            break
          case false:
            valueType = 'boolean'
            break
          default:
            valueType = 'any'
            break
        }
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          if (typeof value[0] === 'object') {
            const childInterfaceName = `${interfaceName}${snakeToPascal(key)}Item`
            interfaceString =
              createInterfaceFromObject(value[0], childInterfaceName) + interfaceString
            valueType = `${childInterfaceName}[]`
          } else {
            valueType = `${typeof value[0]}[]`
          }
        } else {
          valueType = 'any[]'
        }
      } else if (valueType === 'object' && value !== null) {
        const childInterfaceName = `${interfaceName}${snakeToPascal(key)}`
        interfaceString = createInterfaceFromObject(value, childInterfaceName) + interfaceString
        valueType = childInterfaceName
      }
      interfaceString += `  ${key}: ${valueType}\n`
    }
    interfaceString += `}\n`
    return interfaceString
  }

  useEffect(() => {
    if (!value) {
      setResult('')
      return
    }
    try {
      const jsonObject = JSON.parse(value)
      const interfaceLines: string = createInterfaceFromObject(jsonObject, 'IName')
      setResult(interfaceLines)
    } catch (error) {
      setResult('// Invalid JSON')
    }
  }, [value])

  return (
    <div id='json-to-typescript-wrapper' className='min-w-full'>
      <p className='text-xl'>Json to Typescript(Demo)</p>
      <div id='content-wrapper' className='my-5'>
        <div id='basic-options'>
          <div className='md:grid grid-cols-10 gap-5 pt-3'>
            <div className='col-span-5 flex flex-col'>
              <p className='text-lg mb-2'>JSON Value</p>
              <textarea
                className='textarea textarea-info min-w-full h-full'
                placeholder='JSON Value'
                rows={20}
                value={value}
                onChange={(e) => setValue(e?.target?.value || '')}
              />
            </div>

            <div className='col-span-5 flex flex-col'>
              <p className='text-lg mb-2'>Interface result</p>
              <textarea
                className='textarea textarea-info min-w-full h-full'
                placeholder='Interface result'
                rows={20}
                value={result}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JsonToInterface
