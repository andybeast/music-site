'use client'

import React, { useState, useMemo } from 'react'
import SongCard from '@/src/components/datasets/Songcard'
import FilterComponent from '@/src/components/datasets/FilterComponent'

export interface Song {
  id: string
  title: string
  image: string
  link: string
  album: string
  strength: number
  genre: string
  price: number
}

const songs: Song[] = [
  {
    id: "1",
    title: "Believe It",
    image: "https://i.ibb.co/4swsR48/Designer-1.jpg",
    link: "/tropicnights",
    album: "Tropic Nights",
    strength: 2,
    genre: "Pop",
    price: 0.99
  },
  {
    id: "2",
    title: "Times Up",
    image: "https://i.ibb.co/4swsR48/Designer-1.jpg",
    link: "/tropicnights",
    album: "Tropic Nights",
    strength: 2,
    genre: "Rock",
    price: 1.29
  },
  {
    id: "3",
    title: "Or Not",
    image: "https://i.ibb.co/4swsR48/Designer-1.jpg",
    link: "/tropicnights",
    album: "Tropic Nights",
    strength: 3,
    genre: "Hip Hop",
    price: 0.89
  },
  {
    id: "4",
    title: "Planetary",
    image: "https://i.ibb.co/4swsR48/Designer-1.jpg",
    link: "/",
    album: "Heteroscedasticity Test",
    strength: 3,
    genre: "Electronic",
    price: 1.49
  },
  {
    id: "5",
    title: "Granger Causality Test",
    image: "https://i.ibb.co/4swsR48/Designer-1.jpg",
    link: "/regression/granger",
    album: "Predictive Analysis",
    strength: 3,
    genre: "Jazz",
    price: 1.99
  },
]

const SongsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('')
  const [maxPrice, setMaxPrice] = useState(100)

  const genres = useMemo(() => [...new Set(songs.map(song => song.genre))], [])

  const filteredSongs = useMemo(() => {
    return songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (genre === '' || song.genre === genre) &&
      song.price <= maxPrice
    )
  }, [searchTerm, genre, maxPrice])

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-64 mb-4 md:mb-0 md:mr-4">
        <FilterComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genre={genre}
          setGenre={setGenre}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          genres={genres}
        />
      </div>
      <div className="flex-1">
        {filteredSongs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSongs.map(song => (
              <div key={song.id} className="w-full aspect-square">
                <SongCard song={song} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-auto w-[970px]">
            <p className="text-xl text-gray-500">No results found...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SongsList