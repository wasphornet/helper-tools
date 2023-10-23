import Image from 'next/image'
import { Inter } from 'next/font/google'

import TokenConvert from '@/components/token-convert'
import Navbar from '@/components/shared/navbar'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <>
      <Navbar />
      <main className={`min-w-full min-h-screen flex flex-col items-center justify-between p-16`}>
        <TokenConvert />
      </main>
    </>
  )
}

export default Home
