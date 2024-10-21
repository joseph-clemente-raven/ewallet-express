'use client';

import QrScanner from '@/components/QrScanner';
import Link from 'next/link';
import React from 'react';

const Scanner = () => {
    
  return (
    <div className='h-screen flex w-full flex-col justify-center gap-4 items-center bg-gradient-to-tr from-primary to-secondary'>
        <h1 className='text-white text-2xl text-center font-bold'>Welcome, Byahero!</h1>
        <QrScanner />
        <Link href={'/trip-tracking'} className='text-center text-white'>Click here if there is no QR code available (for testing purposes).</Link>
    </div>
  );
};

export default Scanner;