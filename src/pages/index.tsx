import { Inter } from 'next/font/google'

import TokenConvert from '@/components/token-convert'
import Navbar from '@/components/shared/navbar'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const theme = useSelector((state: RootState) => state.theme.value)
  console.log("🚀 ~ file: index.tsx:12 ~ Home ~ theme:", theme)
  
  return (
    <>
      <div data-theme={theme}>
        <Navbar />
        <main className={`min-w-full min-h-screen flex flex-col items-center justify-between p-16`}>
          <TokenConvert />
        </main>
      </div>
    </>
  )
}

export default Home
