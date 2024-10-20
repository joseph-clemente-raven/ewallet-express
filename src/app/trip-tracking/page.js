import dynamic from 'next/dynamic';
import React from 'react'

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function TripTracking() {
  return (
    <Map/>
  )
}
