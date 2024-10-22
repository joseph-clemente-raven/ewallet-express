"use client"; // Ensure this component is treated as a Client Component

import { useGlobalContext } from '@/hooks/useContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const TopupCard = ({ plan }) => {

    const { balance, setBalance } = useGlobalContext();  
    const navigate = useRouter();  

    const handleBalance = () => {
        let totalAmount = balance + plan.amount;
        setBalance(totalAmount);
        navigate.back();
    }

    return (
        <div className='w-full sm:max-w-sm shadow-xl flex flex-col justify-between p-10 rounded-lg bg-white mb-4'>
            <div className="flex flex-col">
                <h2 className='text-2xl font-bold mb-4'>{plan.type} Plan</h2>
                <p className='text-xl font-bold text-primary'>₱{plan.amount}</p>
                <ul className='list-disc list-inside mb-4'>
                {plan.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                ))}
                </ul>
            </div>
            <button 
                className='w-full bg-primary transition-all duration-300 transform hover:scale-105 text-white py-2 rounded hover:bg-primary/70'
                onClick={handleBalance}
            >
                Choose {plan.type}
            </button>
        </div>
    );
};

export default TopupCard;
