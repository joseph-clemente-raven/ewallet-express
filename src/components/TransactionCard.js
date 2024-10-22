import React from 'react'

export default function TransactionCard({item}) {
  return (
    <div className='flex justify-between bg-white items-center shadow-md py-2 border-b-2 px-4'>
        <div className='flex flex-col'>    
            <p className='text-lg font-medium'>{item.origin} - {item.destination}</p>
            <p className='text-sm'>Bus</p>
        </div>
        <div className='flex items-center gap-1'>
            <p className='text-red-500 text-2xl'>₱{item.fare}</p>
        </div>
    </div>
  )
}
