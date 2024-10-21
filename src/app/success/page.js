'use client';

import { useGlobalContext } from '@/hooks/useContext';
import Link from 'next/link';
import React from 'react';

const Success = () => {

    const { fareFee, balance } = useGlobalContext()

    // Simulate generating a reference number and amounts
    const referenceNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // 6-digit reference number

    return (
        <div className='h-screen flex w-full flex-col justify-center gap-4 items-center bg-gradient-to-tr from-primary to-secondary p-6'>
            <h1 className='text-white text-3xl text-center font-bold mb-2'>Payment Successful!</h1>
            <p className='text-white text-lg text-center mb-4'>Thank you for your payment.</p>
            <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
                <h2 className='text-gray-800 text-xl font-semibold mb-2'>Transaction Summary</h2>
                <div className='flex justify-between mb-4'>
                    <span className='text-gray-800'>Reference Number:</span>
                    <span className='text-gray-800'>#{referenceNumber}</span>
                </div>
                <div className='flex justify-between mb-4'>
                    <span className='text-gray-800'>Total Amount Paid:</span>
                    <span className='text-gray-800'>₱{fareFee.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-bold'>
                    <span className='text-gray-800'>E-Wallet Balance:</span>
                    <span className='text-gray-800'>₱{balance.toFixed(2)}</span>
                </div>
            </div>
            <Link 
                href={'/dashboard'} 
                className='mt-6 px-6 py-3 text-primary bg-secondary font-semibold rounded-lg shadow-md hover:bg-primary hover:text-white transition duration-300'
            >
                Go to Dashboard
            </Link>
        </div>
    );
};

export default Success;