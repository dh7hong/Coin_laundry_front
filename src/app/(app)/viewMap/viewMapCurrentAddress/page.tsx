"use client";
// import dynamic from 'next/dynamic'

// const MapWithSearch = dynamic(() => import('@/components/MapWithSearch'), { ssr: false })

import MapWithSearch from "@/components/MapWithSearch";

export default function Home() {
  return (
    <div>
      <h1></h1>
      <MapWithSearch />
    </div>
  )
}
