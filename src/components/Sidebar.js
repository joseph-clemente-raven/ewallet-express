'use client';

import { authenticatedRoutes } from '@/constant';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Sidebar() {

    const path = usePathname();

    if(authenticatedRoutes.find(item => item !== path)) return null;

    return (
        <div>Sidebar</div>
    )
}
