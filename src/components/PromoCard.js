import { imgSetup } from '@/helper'
import Image from 'next/image'
import React from 'react'

export default function PromoCard({img}) {
  return (
    <div className='w-[300px] flex-shrink-0 shadow-xl p-4'>
        <Image src={`${imgSetup}${img}`} width={1200} height={1200} className='w-full h-full' objectFit='cover' />
    </div>
  )
}
