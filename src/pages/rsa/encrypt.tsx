import dynamic from 'next/dynamic'

const ComponentWithJSEncrypt = dynamic(
  () => import('components/rsa/encrypt'), // path of your component
  { ssr: false }
)

const Encrypt = () => {
  return <ComponentWithJSEncrypt />
}

export default Encrypt
