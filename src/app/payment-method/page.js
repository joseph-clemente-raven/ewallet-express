'use client';

import { useGlobalContext } from '@/hooks/useContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const PaymentSummary = () => {
    
    const { fareFee, setFareFee, balance, setBalance } = useGlobalContext();
    const navigate = useRouter();

    const additionalCharges = 1.00; // Additional charges amount
    const totalAmount = parseFloat(fareFee) + additionalCharges; // Total fare amount

    const handlePay = () => {
        setFareFee(totalAmount)
        let newBalance = balance - totalAmount
        setBalance(newBalance)
        navigate.replace('/success');
    };

    return (
        <div className='h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-primary to-secondary p-6'>
            <h1 className='text-white text-3xl text-center font-bold mb-4'>Payment Summary</h1>
            <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
                <h2 className='text-gray-800 text-xl font-semibold mb-2'>Fare Details</h2>
                <p className='text-gray-600 mb-4'>Your fare has been calculated based on the distance traveled and the service type.</p>
                <div className='flex justify-between mb-4'>
                    <span className='text-gray-800'>Base Fare:</span>
                    <span className='text-gray-800'>₱{fareFee}</span>
                </div>
                <div className='flex justify-between mb-4'>
                    <span className='text-gray-800'>Additional Charges:</span>
                    <span className='text-gray-800'>₱{additionalCharges.toFixed(2)}</span>
                </div>
                <div className='flex justify-between font-bold mb-4'>
                    <span className='text-gray-800'>Total Amount:</span>
                    <span className='text-gray-800'>₱{totalAmount.toFixed(2)}</span>
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