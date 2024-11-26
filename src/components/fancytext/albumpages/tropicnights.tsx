'use client'
import React from 'react'
import SongsList from '@/src/lib/SongList'


const Tropic: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-zinc-700 to-zinc-900 text-white py-16 px-4 md:px-8">
      
      <div>

        <SongsList></SongsList>
      </div>
    </section>
  )
}

export default Tropic