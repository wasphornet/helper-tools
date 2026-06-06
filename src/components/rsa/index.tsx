import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

import TextareaWithButton from 'components/@shared/textarea-with-button'
import { RSA_KEY_STORAGE_KEY } from 'utils/constants-value'
import EncryptRSA from './encrypt'
import DecryptRSA from './decrypt'

const tabs = ['Decrypt', 'Encrypt'] as const
type Tab = (typeof tabs)[number]

const RSATool = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Decrypt')
  const [rsaKey, setRsaKey] = useState<string>('')
  const [showKeySetup, setShowKeySetup] = useState<boolean>(false)

  return (
    <div id='rsa-wrapper' className='min-w-full'>
      <p className='text-xl'>Encrypt / Decrypt RSA</p>
      <div id='content-wrapper' className='grid gap-5 my-5 pt-3'>
        <button
          className='flex items-center gap-2 text-l w-fit'
          onClick={() => setShowKeySetup((prev) => !prev)}
        >
          <span>Encrypt Key</span>
          <span className='text-sm'>{showKeySetup ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
        </button>
        {showKeySetup && (
          <TextareaWithButton
            key={RSA_KEY_STORAGE_KEY}
            storageKey={RSA_KEY_STORAGE_KEY}
            rows={3}
            value={rsaKey}
            placeholder='Encrypt Key'
            onChange={(value: any) => setRsaKey(value)}
          />
        )}
      </div>
      <div role='tablist' className='tabs tabs-boxed mb-1'>
        {tabs.map((tab) => (
          <button
            key={tab}
            role='tab'
            className={`tab${activeTab === tab ? ' tab-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === 'Encrypt' ? (
        <EncryptRSA encryptKey={rsaKey} />
      ) : (
        <DecryptRSA decryptKey={rsaKey} />
      )}
    </div>
  )
}

export default RSATool
