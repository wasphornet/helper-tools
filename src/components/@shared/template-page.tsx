import Navbar from './navbar'
import Toaster from './toaster'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import tw from 'tailwind-styled-components'
import { useActiveRoute } from 'hooks/useActiveRoute'
import { routerList } from 'utils/constants-value'

const ContainerStyled = tw.div`
    min-h-screen
    flex
    flex-col
`

const ContentStyled = tw.main`
    flex-1
    p-16
    overflow-auto
`

const Home = ({ children }: any) => {
  const theme = useSelector((state: RootState) => state.theme.value)
  const { activePath } = useActiveRoute()

  const currentRoute = routerList.find((route) => route.pathname === activePath)
  const pageTitle = currentRoute?.routeName || ''

  return (
    <ContainerStyled data-theme={theme}>
      <Navbar />
      <Toaster />
      <ContentStyled>
        {pageTitle && <p className='text-xl mb-5'>{pageTitle}</p>}
        {children}
      </ContentStyled>
    </ContainerStyled>
  )
}

export default Home
