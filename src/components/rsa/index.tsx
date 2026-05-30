import React, { useState } from 'react'
import EncryptRSA from './encrypt'
import DecryptRSA from './decrypt'

const tabs = ['Encrypt', 'Decrypt'] as const
type Tab = (typeof tabs)[number]

const RSATool = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Encrypt')

  return (
    <div id='rsa-wrapper' className='min-w-full'>
      <div role='tablist' className='tabs tabs-boxed mb-5'>
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
      {activeTab === 'Encrypt' ? <EncryptRSA /> : <DecryptRSA />}
    </div>
  )
}

export default RSATool
