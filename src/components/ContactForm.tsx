import React, { SyntheticEvent, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (form.current) {
      try {
        const result = await emailjs.sendForm('service_egqpylm', 'template_n0p2raj', form.current, 'yOUbsktS4SUx-Q6pB');
        alert('Thank you for successful submission! We will contact you soon.');
      } catch (error) {
      }
    }
  };

  return (
    <div className='text-lg bg-gray-50 dark:bg-gray-900 bg-contact-image bg-cover items-center justify-center pb-3 h-fit lg:w-1/2 md:w-2/3 sm:w-2/3 max-sm:w-3/4 space-y-2.5 text-center mx-auto'>
        <div className='h-1 w-32 bg-emerald-300 justify-center mx-auto'></div>
        <h1 className=' font-extrabold text-xl'>Contact Us</h1>
    <form className='space-y-5 md:space-y-10' onSubmit={sendEmail} ref={form}>
      <div className='flex justify-evenly flex-row max-md:flex-col'>
        <div className='flex flex-col space-y-2.5 text-center'>
          <label htmlFor="form-firstName">First name</label>
          <input
            className='max-sm:w-3/4 mx-auto'
            type="text"
            id="form-firstName"
            name="first_name"
            placeholder='Enter firstname'
            required
          />
        </div>
        <div className='flex flex-col space-y-2.5 max-sm:mt-5'>
          <label htmlFor="form-lastName">Last name</label>
          <input
            className='max-sm:w-3/4 mx-auto'
            type="text"
            id="form-lastName"
            name="last_name"
            placeholder='Enter lastname'
            required
          />
        </div>
      </div>
      <div className='flex justify-evenly flex-row max-md:flex-col'>
        <div className='flex flex-col space-y-2.5'>
          <label htmlFor="form-phoneNumber">Phone Number</label>
          <input
            className='max-sm:w-3/4 mx-auto'
            type="tel"
            id="form-phoneNumber"
            name="phone_number"
            placeholder='Enter number'
            required
          />
        </div>
        <div className='flex flex-col space-y-2.5'>
          <label htmlFor="form-email">Email</label>
          <input
            className='max-sm:w-3/4 mx-auto'
            type="email"
            id="form-email"
            name="email"
            placeholder='Enter email'
            required
          />
        </div>
      </div>
      <div className='flex justify-evenly flex-col'>
        <label htmlFor="form-message">Message</label>
        <textarea
          className='w-3/4 mx-auto'
          id="form-message"
          name="message"
          rows={6} // Change this line to use a number instead of a string
          placeholder='Enter message'
          required
        />
      </div>
      <button className='bg-emerald-300 p-3 rounded-full items-center' type='submit'>
        Send Message &rarr;
      </button>
    </form>
    </div>
      )
}

export default ContactForm