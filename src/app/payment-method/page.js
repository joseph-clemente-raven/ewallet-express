'use client';

import { useGlobalContext } from '@/hooks/useContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const additionalCharges = 1.00; // Additional charges amount

const PaymentSummary = () => {
    
    const { fareFee, setFareFee, balance, setBalance } = useGlobalContext();
    const navigate = useRouter();

    const [fee, setFee] = useState(0);
    const [total, setTotal] = useState(0)

    const handlePay = () => {
        setFareFee(total)
        let newBalance = balance - total
        navigate.replace('/success');
        setTimeout(() => {
            setBalance(newBalance)
        }, 2000)
    };

    useEffect(() => {
        if(fareFee){
            setFee(fareFee)
            setTotal(parseFloat(fareFee) + additionalCharges)
        }
    }, [fareFee])

    return (
        <div className='h-screen flex flex-col w-full justify-center items-center bg-gradient-to-tr from-primary to-secondary p-6'>
            <h1 className='text-white text-3xl text-center font-bold mb-4'>Payment Summary</h1>
            <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
                <h2 className='text-gray-800 text-xl font-semibold mb-2'>Fare Details</h2>
                <p className='text-gray-600 mb-4'>Your fare has been calculated based on the distance traveled and the service type.</p>
                <div className='flex justify-between mb-4'>
                    <span className='text-gray-800'>Base Fare:</span>
                    <span className='text-gray-800'>₱{fee}</span>
                </div>
                <div className='flex justify-between mb-4'>
                    <span className='text-gray-800'>Additional Charges:</span>
                    <span className='text-gray-800'>₱{additionalCharges.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-bold mb-4'>
                    <span className='text-gray-800'>Total Amount:</span>
                    <span className='text-gray-800'>₱{total.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-bold mb-2'>
                    <span className='text-gray-800'>E-Wallet Balance:</span>
                    <span className='text-gray-800'>₱{balance.toFixed(2)}</span>
                </div>
            </div>
            <button 
                onClick={handlePay} 
                className='mt-6 px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-primary hover:text-white transition duration-300'
            >
                Pay Now
            </button>
        </div>
    );
};

export default PaymentSummary;