import React from 'react'
import Image from 'next/image'
import { DollarSign } from 'lucide-react'
import Link from 'next/link'
import Checkmark from '@/src/components/buttons/CheckMark'

interface Song {
  id: string
  title: string
  image: string
  link: string
  album: string
  strength: number  // Note: keeping the typo to match the provided interface
}

interface SongCardProps {
  song: Song
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 transition-transform hover:scale-105 hover:shadow-2xl">
      <Link href={song.link}>
        <div className="relative w-full aspect-square mb-3">
          <Image
          src={song.image}
          alt={song.title}
          fill // Replaces layout="fill"
          className="rounded-md object-cover" // Adds object-fit via CSS
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate sans-serif">
          {song.title}
        </h3>
      </Link>
      <p className="text-gray-800 text-sm mb-2 truncate">{song.album}</p>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
        <DollarSign className="w-6 h-6 text-yellow-500 mr-1" />
        <p className="text-yellow-600 font-bold text-xl">{song.strength}</p>
        </div>
      <Checkmark />
      </div>
      
      
      
    </div>
  )
}

export default SongCard