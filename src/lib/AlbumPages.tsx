'use client'

import React, { useState, useMemo } from 'react'
import { songs, type Song } from './songs'
import PlayButton from '@/src/components/buttons/PlayButton'
import { songLinks } from './songs'

interface AlbumCardProps {
  song: Song
  currentlyPlaying: number | null
  setCurrentlyPlaying: React.Dispatch<React.SetStateAction<number | null>>
}

const AlbumCard: React.FC<AlbumCardProps> = ({ song, currentlyPlaying, setCurrentlyPlaying }) => {
  return (
    <div className="bg-black rounded-lg shadow-lg p-4 transition-transform hover:scale-105 hover:shadow-2xl relative z-0">
      <h3 className="text-xl font-semibold text-white mb-1 truncate sans-serif">
        {song.title}
      </h3>
      <p className="text-gray-200 text-sm mb-2 truncate">{song.album}</p>
      <div className="flex items-center justify-between w-full">
        <PlayButton 
          songLink={songLinks[song.id]}
          songId={song.id}
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying} 
          size="lg" 
        />
      </div>
    </div>
  )
}

interface AlbumDisplayProps {
  albumName: string
  className?: string
}

export const AlbumDisplay: React.FC<AlbumDisplayProps> = ({ albumName, className = "" }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)

  const albumSongs = useMemo(() => {
    return songs.filter(song => song.album.toLowerCase() === albumName.toLowerCase())
  }, [albumName])

  if (albumSongs.length === 0) {
    return (
      <div className="w-full p-4 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-center">No songs found in this album</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {albumSongs.map(song => (
        <div key={song.id} className="w-full">
          <AlbumCard 
            song={song}
            currentlyPlaying={currentlyPlaying}
            setCurrentlyPlaying={setCurrentlyPlaying}
          />
        </div>
      ))}
    </div>
  )
}

// Example usage component
export const AlbumPage: React.FC = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Album: Tropic Nights</h1>
        <AlbumDisplay albumName="Tropic Nights" className="max-w-md" />
      </div>
    )
  }

