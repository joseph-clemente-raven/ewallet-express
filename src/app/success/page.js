'use client';

import { useGlobalContext } from '@/hooks/useContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Success = () => {

    const navigate = useRouter()
    const { fareFee, balance, setBalance, setCurrentAccount, setFareFee } = useGlobalContext()
    const [total, setTotal] = useState(0)
    const [reference, setReference] = useState(Math.floor(Math.random() * 1000000).toString().padStart(6, '0'))

    // Simulate generating a reference number and amounts
    const handleBack = () => {
        navigate.replace('/menu');
        setCurrentAccount(null);
        setBalance(0);
        setFareFee(0);
    }

    useEffect(() => {
        if(fareFee){
            setTotal(fareFee + 1)
        }
    }, [fareFee])

    return (
        <div className='h-screen flex w-full flex-col justify-center gap-4 items-center bg-gradient-to-tr from-primary via-white to-secondary p-6'>
            <h1 className='text-3xl text-center font-bold mb-2'>Payment Successful!</h1>
            <p className='text-lg text-center mb-4'>Thank you for your payment.</p>
            <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
                <h2 className='text-gray-800 text-xl font-semibold mb-2'>Transaction Summary</h2>
                <div className='flex justify-between mb-4'>
                    <span className='text-gray-800'>Reference Number:</span>
                    <span className='text-gray-800'>#{reference}</span>
                </div>
                <div className='flex justify-between mb-4'>
                    <span className='text-gray-800'>Total Amount Paid:</span>
                    <span className='text-gray-800'>₱{total.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-bold'>
                    <span className='text-gray-800'>E-Wallet Balance:</span>
                    <span className='text-gray-800'>₱{balance.toFixed(2)}</span>
                </div>
            </div>
            <button  
                onClick={handleBack}
                className='mt-6 px-6 py-3 text-primary bg-secondary font-semibold rounded-lg shadow-md hover:bg-primary hover:text-white transition duration-300'
            >
                Go to Menu
            </button>
        </div>
    );
};

export default Success;