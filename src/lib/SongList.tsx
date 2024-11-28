'use client'

import React, { useState, useMemo } from 'react';
import SongCard from '@/src/components/datasets/Songcard';
import FilterComponent from '@/src/components/datasets/FilterComponent';
import { songs } from './songs'





const EmptyCard: React.FC = () => (
  <div className="w-full aspect-square bg-white border rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
    <p className="text-2xl text-gray-500 text-center">No results found...</p>
  </div>
);

const SongsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

  const genres = useMemo(() => {
    const allGenres = songs.flatMap(song => song.genres);
    return [...new Set(allGenres)];
  }, []);

  const filteredSongs = useMemo(() => {
    return songs.filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenres.length === 0 || song.genres.some(genre => selectedGenres.includes(genre))) &&
      song.price <= maxPrice
    );
  }, [searchTerm, selectedGenres, maxPrice]);

  return (
    <div className="flex flex-col md:flex-row py-8 px-6">
      <div className="md:w-64 mb-4 md:mb-0 md:mr-4">
        <FilterComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          genres={genres}
        />
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => (
              <div key={song.id} className="w-full aspect-square relative z-0">
                <SongCard 
                  song={song} 
                  currentlyPlaying={currentlyPlaying} 
                  setCurrentlyPlaying={setCurrentlyPlaying}
                />
              </div>
            ))
          ) : (
            <div className="w-full aspect-square">
              <EmptyCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongsList;