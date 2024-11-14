'use client'

import React from 'react';
import Image from 'next/image';
import { DollarSign } from 'lucide-react';
import Link from 'next/link';
import PlayButton from '@/src/components/buttons/PlayButton';

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
const songLinks: Record<number, string> = {
  1: "https://storage.googleapis.com/lunarboom-music/Completesongs/Canyoubelieveit%20SNIPPET.wav",
  2: "https://storage.googleapis.com/lunarboom-music/Completesongs/TimesUp-kopi.wav",
  3: "https://storage.googleapis.com/lunarboom-music/Completesongs/Donotgiveup-snip.wav",
  4: "https://storage.googleapis.com/lunarboom-music/Completesongs/tropicanos_snippppet.wav",
  5: "https://storage.googleapis.com/lunarboom-music/Completesongs/sunny%20lofi_snipp.wav",
  6: "https://storage.googleapis.com/lunarboom-music/Completesongs/monkey%20tunes_snip.wav",
  7:"https://storage.googleapis.com/lunarboom-music/Completesongs/beachy%20lofi_snip.wav",
  

  // Add more entries as needed
};

const SongCard: React.FC<SongCardProps> = ({ song, currentlyPlaying, setCurrentlyPlaying }) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg p-4 transition-transform hover:scale-105 hover:shadow-2xl">
      <Link href={song.link}>
        <div className="relative w-full aspect-square mb-3">
          <Image
            src={song.image}
            alt={song.title}
            fill
            className="rounded-md object-cover"
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
