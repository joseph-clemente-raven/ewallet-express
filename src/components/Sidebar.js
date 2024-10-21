'use client';

import { authenticatedRoutes } from '@/constant';
import { usePathname } from 'next/navigation';
import React from 'react'
import SidebarContent from './SidebarContent';

export default function Sidebar({children}) {

    const path = usePathname();

    if(authenticatedRoutes?.find(item => item === path)){
        return (
            <SidebarContent>
                {children}
            </SidebarContent>
        )
    }
    else{
        return children
    }
}
