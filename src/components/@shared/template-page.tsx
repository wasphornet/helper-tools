
import Navbar from './navbar'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import tw from 'tailwind-styled-components'

const MainStyled = tw.main`
    min-w-full 
    min-h-screen 
    flex 
    flex-col 
    items-center 
    justify-between 
    p-16
    overflow-x-auto
`

const Home = ({ children }: any) => {
    const theme = useSelector((state: RootState) => state.theme.value)
    console.log("🚀 ~ file: index.tsx:12 ~ Home ~ theme:", theme)

    return (
        <div data-theme={theme}>
            <Navbar />
            <MainStyled>
                {children}
            </MainStyled>
        </div>
    )
}

export default Home
