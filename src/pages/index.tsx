import Image from 'next/image'
import { Inter } from 'next/font/google'

import TokenConvert from '@/components/token-convert'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <main className={`md:container md:mx-auto flex min-h-screen flex-col items-center justify-between p-24 bg-white`}>
      <TokenConvert />
    </main>
  )
}

export default Home
