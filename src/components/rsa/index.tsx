import React, { useState, Fragment } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

import TextareaWithButton from 'components/@shared/textarea-with-button'
import { RSA_KEY_STORAGE_KEY } from 'utils/constants-value'
import EncryptRSA from './encrypt'
import DecryptRSA from './decrypt'

const tabs = [
  {
    label: 'Encrypt',
    value: 'encrypt',
    renderContent: (rsaKey: string) => <EncryptRSA encryptKey={rsaKey} />
  },
  {
    label: 'Decrypt',
    value: 'decrypt',
    renderContent: (rsaKey: string) => <DecryptRSA decryptKey={rsaKey} />
  }
] as const
type Tab = (typeof tabs)[number]['value']

const RSATool = () => {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0].value as Tab)
  const [rsaKey, setRsaKey] = useState<string>('')
  const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false)

  return (
    <div id='rsa-wrapper' className='min-w-full grid gap-5 my-5'>
      <div className='collapse bg-base-300 border border-base-300'>
        <input
          type='checkbox'
          checked={isCollapseOpen}
          onChange={(e) => setIsCollapseOpen(e.target.checked)}
        />
        <div className='collapse-title font-semibold flex items-center gap-2'>
          <span>Encrypt Key</span>
          {isCollapseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
        <div className='collapse-content'>
          <TextareaWithButton
            key={RSA_KEY_STORAGE_KEY}
            storageKey={RSA_KEY_STORAGE_KEY}
            rows={3}
            value={rsaKey}
            placeholder='Encrypt Key'
            onChange={(value: string) => setRsaKey(value)}
          />
        </div>
      </div>
      <div className='tabs tabs-lift tabs-xl'>
        {tabs.map((tab) => {
          return (
            <Fragment key={tab.value}>
              <input
                type='radio'
                name='my_tabs_3'
                className={`tab [--tab-bg:var(--color-base-300)] [--tab-border-color:var(--color-secondary)]`}
                aria-label={`${tab.label}`}
                key={tab.value}
                checked={activeTab === tab.value}
                onChange={() => setActiveTab(tab.value as Tab)}
              />
              <div className='tab-content bg-base-300 border-secondary p-6'>
                {tab.renderContent(rsaKey)}
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default RSATool
