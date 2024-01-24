import ContactForm from '@/components/ContactForm'
import HorizontalNavbar from '@/components/HorizontalNavbar'
import React from 'react'

const contact = () => {
  return (
    <div className=' flex flex-col min-h-screen md:justify-between'>
      <HorizontalNavbar />
      <ContactForm />
    </div>
  )
}

export default contact