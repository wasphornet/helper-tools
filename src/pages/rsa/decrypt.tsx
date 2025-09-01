import dynamic from 'next/dynamic'

const ComponentWithJSEncrypt = dynamic(
    () => import('components/rsa/decrypt'), // path of your component
    { ssr: false }
)

const Decrypt = () => {
    return (
        <ComponentWithJSEncrypt />
    )
}

export default Decrypt
