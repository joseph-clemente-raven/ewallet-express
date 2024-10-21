'use client';

import QrScanner from '@/components/QrScanner';
import React from 'react';

const Scanner = () => {
    
  return (
    <div className='h-screen flex w-full flex-col justify-center items-center'>
        <h1>Welcome to the QR Scanner App</h1>
        <QrScanner />
    </div>
  );
};

export default Scanner;