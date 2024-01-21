import React, { useState } from 'react'

const PricingTabs = () => {

    const [ calender, setCalender] = useState("monthly")

    const changeCalender = (newCalender: React.SetStateAction<string>) => {
        setCalender(newCalender);
      };

    const getPriceBasic = () => {
    return calender === 'monthly' ? '$19.99' : '$219.99';
    };

    const getPricePro = () => {
        return calender === 'monthly' ? '$49.99' : '$579.99';
    };

    const getPriceEnterprise = () => {
        return calender === 'monthly' ? '$99.99' : '$1179.99';
    };

    const getPeriod = () => {
    return calender === 'monthly' ? ' per month' : ' per year';
    };
    

  return (
    <div className=' p-3'>
        <div className=' flex flex-col justify-center items-center'>
            <h1 className=' font-bold text-8xl mb-4 text-emerald-300 dark:text-white'>Pricing</h1>
            <p className=' text-center text-emerald-800 dark:text-white'>
            Unlock the full potential of StockSync Innovations with our flexible pricing plans. 
            </p>
            <p className=' text-center text-emerald-800 dark:text-white pt-2 px-2'>
            Choose the one that best fits your business needs and takes your inventory management to the next level.
            </p>
            <div className='my-5'>
                <button
                    onClick={() => changeCalender('monthly')}
                    className={`px-4 py-2 ${calender === 'monthly' ? 'bg-emerald-300 dark:bg-emerald-800' : 'bg-gray-300 dark:bg-gray-900'}`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => changeCalender('yearly')}
                    className={`px-4 py-2 ${calender === 'yearly' ? 'bg-emerald-300 dark:bg-emerald-800' : 'bg-gray-300 dark:bg-gray-900'}`}
                >
                    Yearly
                </button>
                </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:flex lg:flex-row justify-center'>
            <div className=' bg-slate-100 dark:bg-gray-900 space-y-5 p-5 mx-5 mb-10'>
                <p className=' font-bold'>Basic Plan</p>
                <p> Essential Inventory Control</p>
                <p>Starting at <span className=' font-bold text-3xl'>{getPriceBasic()}</span>{getPeriod()}</p>
                <hr />
                <p>Features</p>
                <p className=' flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <span className=' ml-2'></span>Effortlessly manage stock levels</p>
                <p className=' flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <span className=' ml-2'></span>Streamline order processes</p>
                <p className=' flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <span className=' ml-2'></span>Basic reporting features</p>
                <div className=' flex flex-col items-center'>
                    <button className=' bg-black w-full text-white px-4 py-2'>
                        Upgrade
                    </button>
                    <button className=' px-4 w-full py-2'>
                        Contact Sale
                    </button>
                </div>
            </div>
            <div className=' bg-red-200 dark:bg-pink-800 space-y-5 p-5 mx-5 mb-10'>
                <p className=' font-bold'>Pro Plan </p>
                <p>Advanced Inventory Management</p>
                <p>Starting at <span className=' font-bold text-3xl'>{getPricePro()}</span>{getPeriod()}</p>
                <hr />
                <p>Features</p>
                <p className=' flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <span className=' ml-2'></span>All features in the Basic Plan</p>
                <p className=' flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <span className=' ml-2'></span>Real-time updates on stock movements</p>
                <p className=' flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <span className=' ml-2'></span>Enhanced reporting and analytics</p>
                <div className=' flex flex-col items-center'>
                    <button className=' bg-black w-full text-white px-4 py-2'>
                        Upgrade
                    </button>
                    <button className=' px-4 w-full py-2'>
                        Contact Sale
                    </button>
                </div>
            </div>
            <div className=' bg-emerald-300 dark:bg-emerald-800 space-y-5 p-5 mx-5 mb-10'>
                <p className=' font-bold'>Enterprise Plan</p>
                <p>Comprehensive Supply Chain Solutions</p>
                <p>Starting at <span className=' font-bold text-3xl'>{getPriceEnterprise()}</span>{getPeriod()}</p>
                <hr />
                <p>Features</p>
                <p className=' flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <span className=' ml-2'></span>All features in the Pro Plan</p>
                <p className=' flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <span className=' ml-2'></span>Supplier integration</p>
                <p className=' flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    <span className=' ml-2'></span>Multi-channel synchronization</p>
                <div className=' flex flex-col items-center'>
                    <button className=' bg-black w-full text-white px-4 py-2'>
                        Upgrade
                    </button>
                    <button className=' px-4 w-full py-2'>
                        Contact Sale
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PricingTabs