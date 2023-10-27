
import Navbar from '@/components/shared/navbar'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const Home = ({ children }: any) => {
    const theme = useSelector((state: RootState) => state.theme.value)
    console.log("🚀 ~ file: index.tsx:12 ~ Home ~ theme:", theme)

    return (
        <>
            <div data-theme={theme}>
                <Navbar />
                <main className={`min-w-full min-h-screen flex flex-col items-center justify-between p-16`}>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Home
