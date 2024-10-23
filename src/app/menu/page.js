'use client';

import { imgSetup } from '@/helper';
import { useGlobalContext } from '@/hooks/useContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Menu = () => {
    
    const { setCurrentAccount } = useGlobalContext();

    useEffect(() => {
        setCurrentAccount(null);
    }, [])

    return (
        <div className='h-screen flex flex-col w-full justify-center items-center bg-gradient-to-tr from-primary via-white to-secondary p-20 xl:p-96'>
            <div className='absolute top-0 w-full p-6'>
                <div onClick={() => navigate.back()} className='bg-primary shadow-xl h-12 flex justify-center items-center rounded-full w-12 p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                </div>
            </div>
            <Image src={`${imgSetup}logo.png`} width={160} height={160} objectFit='contain' className='mb-2' alt='logo' />
            <h2 className='text-gray-800 font-semibold mb-2 text-4xl'> Manage Your eWallet</h2>
            <p className='text-gray-600 mb-4 text-2xl'>Choose from the following options:</p>
            <div className='flex flex-col gap-6 w-full mt-4'>    
                <Link href={'/scanner'} className='w-full bg-primary py-6 text-2xl shadow-xl font-bold text-white flex justify-center items-center rounded-full'>Start/End Trip</Link>
                <Link href={'/balance'} className='w-full bg-primary py-6 text-2xl shadow-xl font-bold text-white flex justify-center items-center rounded-full'>Balance Inquiry</Link>
                {/* <Link href={'/scanner'} className='w-full bg-primary py-6 text-2xl shadow-xl font-bold text-white flex justify-center items-center rounded-full'>Fare Calculation</Link> */}
            </div>
        </div>
    );
};

export default Menu;