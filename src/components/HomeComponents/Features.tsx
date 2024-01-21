import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import hero_image from '../../../public/features_image.svg'
import { useSession, signIn, signOut } from "next-auth/react"


const Features = () => {
    const { data: session } = useSession();

  return (
    <div className=' flex flex-col lg:flex-row pt-10'>
        <div className=' flex flex-col flex-1 justify-center items-center lg:items-start lg:ml-16'>
        <h1 className=' font-bold sm:text-6xl text-2xl text-center lg:text-start text-emerald-500 dark:text-white mb-4'>
            Revolutionize with <span><br/></span> Seamless  <span className=' max-lg:hidden'><br/></span> Integration
        </h1>
        <p className=' text-emerald-800 dark:text-white max-lg:px-5 lg:w-96 lg:pr-10 text-center lg:text-start mb-2'>
            "Transform your inventory management paradigm through seamless integration with StockSync Innovations, revolutionizing stock control, order processes, supplier relationships, and multi-channel synchronization."        </p>
        <div className=' space-x-5'>
            <button className=" bg-white dark:bg-black rounded-3xl py-2 px-4 border-black dark:border-white border-2">
                Learn more &rarr;
            </button>
        </div>
        </div>
        <div className=' flex flex-1.5'>
            <Image 
                className=' mx-auto'
                src={hero_image} alt=""
            />
        </div>
    </div>
  )
}

export default Features