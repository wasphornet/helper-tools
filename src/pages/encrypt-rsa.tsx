import TemplatePage from 'components/@shared/template-page'
import dynamic from 'next/dynamic'
const ComponentWithJSEncrypt = dynamic(
    () => import('components/encrypt-rsa'), // path of your component
    { ssr: false }
  )

const ConvertToken = () => {
    return (
        <TemplatePage>
            <ComponentWithJSEncrypt />
        </TemplatePage>
    )
}

export default ConvertToken
