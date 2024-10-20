'use client';

import { authenticatedRoutes } from '@/constant';
import { imgSetup } from '@/helper';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Navbar() {
    const path = usePathname();

    if (authenticatedRoutes.find(item => item === path)) return null;

    return (
        <div className="absolute top-0 left-0 right-0 flex justify-center z-50">
            <div className='flex justify-between w-[90%] sm:w-1/2 py-3'>
                <Link href={'/'}>
                    <Image src={`${imgSetup}logo.png`} alt='logo' objectFit='contain' width={70} height={70} />
                </Link>
                <div className='flex items-center'>
                    <Link href={'/login'} className="relative text-white group px-4">
                        <p className={`transition-all duration-300 font-bold ${path === '/login' ? 'text-secondary' : ''}`}>
                            Login
                        </p>
                        <span className='absolute left-0 right-0 h-1 bg-white transition-transform duration-300 scale-x-0 group-hover:scale-x-100' />
                    </Link>
                    <Link href={'/register'} className="relative text-white group px-4">
                        <p className={`transition-all duration-300 font-bold ${path === '/register' ? 'text-secondary' : ''}`}>
                            Register
                        </p>
                        <span className='absolute left-0 right-0 h-1 bg-white transition-transform duration-300 scale-x-0 group-hover:scale-x-100' />
                    </Link>
                </div>
            </div>
        </div>
    );
}
