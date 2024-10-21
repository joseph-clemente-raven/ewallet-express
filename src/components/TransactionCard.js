import React from 'react'

export default function TransactionCard({item}) {
  return (
    <div className='flex justify-between items-center py-2'>
        <div className='flex flex-col'>    
            <p className='text-lg font-medium'>{item.origin} - {item.destination}</p>
            <p className='text-sm'>Bus</p>
        </div>
        <div className='flex items-center gap-1'>
            <p className='text-red-500 text-2xl'>₱{item.fare}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#808080" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </div>
    </div>
  )
}
