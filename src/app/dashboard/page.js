'use client';
import PromoCard from '@/components/PromoCard';
import TransactionCard from '@/components/TransactionCard';
import { transactionData } from '@/constant';
import { imgSetup } from '@/helper';
import { useGlobalContext } from '@/hooks/useContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Dashboard = () => {

  const { balance } = useGlobalContext()

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <div className='bg-gradient-to-b from-primary to-secondary flex flex-col gap-8 pt-4 pb-14'>
        <div className='flex justify-between pt-6 px-6'>
          <div>
            <p className='text-gray-200'>Good morning,</p>
            <p className='font-extrabold text-xl text-yellow-400'>Juan Dela Cruz</p>
          </div>
          <Link href={'/profile'}>
            <Image src={`${imgSetup}user.png`} className='shadow-xl rounded-full' width={50} height={50} alt='user' />
          </Link>
        </div>
        <div className='rounded-lg bg-primary/70 flex flex-col mx-6 shadow-xl'>
          <div className='flex justify-between items-center pt-4 px-4'>
            <p className='text-xs text-gray-200'>Available Balance</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
          <div className='px-4 pb-2'>  
            <p className='text-2xl text-white font-bold'>{balance.toFixed(2)}</p>
          </div>
          <div className='rounded-lg w-full flex justify-between bg-gradient-to-b from-primary to-primary/50 py-4'>
            <Link href={'/top-up'} className='flex flex-col justify-center items-center gap-1 border-r-2 border-white flex-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className='text-[10px] text-white'>Top-up</p>
            </Link>
            <Link href={'/menu'} className='flex flex-col justify-center border-r-2 border-white items-center gap-1 flex-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
              </svg>
              <p className='text-[10px] text-white'>Scan QR</p>
            </Link>
            <Link href={'/history'} className='flex flex-col justify-center items-center gap-1 flex-1'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>
              <p className='text-[10px] text-white'>History</p>
            </Link>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 bg-white -mt-6 pt-4 rounded-t-3xl'>
        <div className='flex justify-between items-center px-6 pt-4'>
          <p className='text-lg font-bold'>Promo & Discount</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="flex flex-row space-x-4 pb-4 px-6 overflow-x-auto w-full">
          <PromoCard
            img={`1.png`}
          />
          <PromoCard
            img={`2.png`}
          />
          <PromoCard
            img={`1.png`}
          />
        </div>
        <div className='flex justify-between items-center px-6'>
          <p className='text-lg font-bold'>Transaction History</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className='flex flex-col px-6 shadow-xl pb-6'>
          <div className='flex justify-between items-center mb-2'>
            <p className='text-lg font-bold'>Today</p>
            <p className='text-lg font-bold'>Amount</p>
          </div>
          {
            transactionData.map((item, key) => (
              <TransactionCard item={item} key={key}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;