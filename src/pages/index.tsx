import Experience from '@/components/HomeComponents/Experience'
import Hero from '@/components/HomeComponents/Hero'
import HorizontalNavbar from '@/components/HorizontalNavbar'
import Why from '@/components/HomeComponents/Why'
import Features from '@/components/HomeComponents/Features'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col m-0 ${inter.className}`}
    >
      <HorizontalNavbar />
      <Hero />
      <Why />
      <Features />
      <Experience />
      <Footer />
      
    </main>
  )
}
