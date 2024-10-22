'use client';

import QrScanner from '@/components/QrScanner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Scanner = () => {
  
  const navigate = useRouter()

  return (
    <div className='h-screen flex w-full relative flex-col justify-center gap-4 items-center bg-gradient-to-tr from-primary via-white to-secondary'>
      <div className='absolute top-0 w-full p-6'>
        <div onClick={() => navigate.back()} className='bg-primary shadow-xl h-12 flex justify-center items-center rounded-full w-12 p-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </div>
      </div>
      <h1 className='text-2xl text-center font-bold'>Welcome, Byahero!</h1>
      <QrScanner />
      <Link href={'/trip-tracking'} className='text-center text-gray-700 px-10'>Click here if there is no QR code available (for testing purposes).</Link>
    </div>
  );
};

export default Scanner;