'use client'

import React from 'react';
import Image from 'next/image';
import { DollarSign } from 'lucide-react';
import Link from 'next/link';
import PlayButton from '@/src/components/buttons/PlayButton';
import { songLinks } from '@/src/lib/songs';


interface Song {
  id: number;
  title: string;
  image: string;
  link: string;
  album: string;
  strength: number;
}

interface SongCardProps {
  song: Song;
  currentlyPlaying: number | null;  // Add currentlyPlaying prop
  setCurrentlyPlaying: React.Dispatch<React.SetStateAction<number | null>>;  // Add setCurrentlyPlaying prop
}

// Define songLinks as a constant dictionary mapping IDs to URLs


const SongCard: React.FC<SongCardProps> = ({ song, currentlyPlaying, setCurrentlyPlaying }) => {
  return (
    <div className="bg-black rounded-lg shadow-lg p-4 transition-transform hover:scale-105 hover:shadow-2xl relative z-0">
      <Link href={song.link}>
        <div className="relative w-full aspect-square mb-3">
          <Image
            src={song.image}
            alt={song.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-1 truncate sans-serif">
          {song.title}
        </h3>
      </Link>
      <p className="text-gray-200 text-sm mb-2 truncate">{song.album}</p>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <DollarSign className="w-6 h-6 text-yellow-500 mr-1" />
          <p className="text-yellow-600 font-bold text-xl">{song.strength}</p>
        </div>
        {/* Pass correctly the currentlyPlaying and setCurrentlyPlaying props */}
        <PlayButton 
          songLink={songLinks[song.id]}
          songId={song.id} // Pass the songId for comparison inside PlayButton
          currentlyPlaying={currentlyPlaying}
          setCurrentlyPlaying={setCurrentlyPlaying} 
          size="lg" 
        />
      </div>
    </div>
  );
};

export default SongCard;
