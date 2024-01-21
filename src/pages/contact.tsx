import React from 'react'
import HorizontalNavbar from '@/components/HorizontalNavbar'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'
import ContactForm from '@/components/ContactForm'

const inter = Inter({ subsets: ['latin'] })


const contact = () => {
  return (
    <main
    className={`flex min-h-screen justify-between flex-col m-0 ${inter.className}`}
    >
      <HorizontalNavbar />
      <ContactForm />
      <Footer />

    </main>
  )
}

export default contact