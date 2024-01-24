import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import ThemeSwitch from '@/components/ThemeSwitch';
import Image from 'next/image';
import logo_black from '../../public/logo-tower-black.png';
import logo_white from '../../public/logo-tower-white.png';
import LoginSection from './LoginSection';
import Link from 'next/link';
import DisplayStores from './Routing/DisplayStores';

const HorizontalNavbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);

  

  useEffect(() => {
    setMounted(true);
  }, []);


  const toggleMenu = () => {
    setSideMenuVisible(!isSideMenuVisible);
  };

  return (
    <div>
    <div className='flex flex-row py-2 lg:px-16 px-2 items-center space-x-3'>
      <Link href="/">
        <div className=' w-60 h-34'>
        {mounted && (
    <>
      {resolvedTheme === 'dark' ? (
        <Image
          src={logo_white}
          alt="Logo for dark theme"
          width={120}
          height={60}
          priority
        />
      ) : (
        <Image
          src={logo_black}
          alt="Logo for a white theme"
          width={120}
          height={60}
          priority
        />
      )}
    </>
  )}
        </div>
      </Link>
      <div className='flex w-full justify-end items-center'>
      <ThemeSwitch  />
        <ul className='flex flex-row space-x-5'>
          <Link href="/" className=' hidden sm:flex'>
            <li className='flex flex-col items-center'>
              <p>Home</p>
            </li>
          </Link>
          <Link href="/pricing" className=' hidden sm:flex'>
            <li className='flex flex-col items-center'>
              <p>Pricing</p>
            </li>
          </Link>
          <Link href="/contact" className=' hidden sm:flex'>
            <li className='flex flex-col items-center'>
              <p>Contact</p>
            </li>
          </Link>
          <li className='flex flex-col items-center' onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 flex sm:hidden">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
            <p className=' hidden sm:flex'>Menu</p>
          </li>
        </ul>
        </div>
            <p className=' hidden sm:flex'>|</p>
            <span className=' hidden sm:flex'>
            <LoginSection />
            </span>        </div>
        {isSideMenuVisible && (
          <div className=" absolute side-menu-content p-4 bg-gray-200 dark:bg-gray-900 flex flex-col text-right w-60 right-0">
            <Link className=' flex sm:hidden' href="/">
              <button className=" flex flex-row py-2 px-4 hover:bg-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <p className=' ml-2'>Home</p>
              </button>
            </Link>
            <Link className=' flex sm:hidden' href="/pricing">
              <button className=" flex flex-row py-2 px-4 hover:bg-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p className=' ml-2'>Pricing</p>
              </button>
            </Link>
            <Link className=' flex sm:hidden' href="/contact">
              <button className=" flex flex-row py-2 px-4 hover:bg-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                <p className=' ml-2'>Contact</p>
              </button>
            </Link>
            <span className=' flex'>
              <DisplayStores />
            </span>
            <span className=' flex sm:hidden'>
            <LoginSection />
            </span>
          </div>
        )}
        </div>
  );
};

export default HorizontalNavbar;
