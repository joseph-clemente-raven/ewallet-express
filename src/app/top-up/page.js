'use client';

import TopupCard from '@/components/TopupCard'
import { plans } from '@/constant'
import Link from 'next/link'
import React from 'react'

export default function Topup() {

  return (
    <div className='w-full flex flex-col gap-4 p-6 max-h-screen'>
      <div className='flex items-center w-full justify-between'>
        <p className='text-2xl font-bold'>Top-up</p>
          <nav aria-label="breadcrumb">
          <ol class="flex space-x-2 text-gray-700">
            <li>
              <Link href="/dashboard" class="text-gray-500 hover:underline">Dashboard</Link>
            </li>
            <li>
              <span class="text-gray-500">/</span>
            </li>
            <li>
              <Link href={'/top-up'} class="text-primary">Top up</Link>
            </li>
          </ol>
        </nav>
      </div>
      <div className='flex flex-wrap gap-6'>
        {
          plans.length === 0 ?
          <p>No plans yet available</p>
          :
          plans?.map((item, index)  => (
            <TopupCard plan={item} key={index}/>
          ))
        }
      </div>
    </div>
  )
}
