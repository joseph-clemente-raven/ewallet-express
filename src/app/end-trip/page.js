import dynamic from 'next/dynamic';
import React from 'react'

const Map = dynamic(() => import('@/components/EndTrip'), { ssr: false });

export default function TripTracking() {
  return (
    <Map/>
  )
}
