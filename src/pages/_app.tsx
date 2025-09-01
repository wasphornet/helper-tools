import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from 'store'
import { Provider } from 'react-redux'
import TemplatePage from 'components/@shared/template-page'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <TemplatePage>
        <Component {...pageProps} />
      </TemplatePage>
    </Provider>
  )
}
