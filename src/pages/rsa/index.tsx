import dynamic from 'next/dynamic'

const RSATool = dynamic(() => import('components/rsa'), { ssr: false })

const RSAPage = () => {
  return <RSATool />
}

export default RSAPage
