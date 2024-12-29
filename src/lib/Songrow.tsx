import React from 'react'
import { Song } from './songs'
import PlayButton from '@/src/components/buttons/PlayButton'
import { songLinks } from './songs'

interface SongRowProps {
    song: Song
    index: number
    currentlyPlaying: number | null
    setCurrentlyPlaying: React.Dispatch<React.SetStateAction<number | null>>
}

const SongRow: React.FC<SongRowProps> = ({ song, index, currentlyPlaying, setCurrentlyPlaying }) => {
    return (
        <div className="flex justify-center gap-16 items-center py-2 px-4 hover:bg-gray-600 transition-colors duration-200 w-full">
            <span className="text-gray-400 w-8 text-left">{index + 1}</span>
            <div className="flex flex-col flex-grow overflow-hidden">
                <p className="font-medium text-gray-200 truncate text-xl fade-in-left-1">{song.title}</p>
                <p className="text-sm text-gray-500 truncate fade-in-left-2">Lunar Boom</p>
            </div>
            <span className="text-lg text-gray-300 w-16 text-left">N/A</span>
            <span className="text-lg text-gray-300 w-16 text-left">{song.lenght}</span>
            <span className="text-lg text-gray-300 w-16 text-left">${song.price}</span>
            <span className="text-lg text-gray-300 w-16 text-left">Link</span>
            <PlayButton
                songLink={songLinks[song.id]}
                songId={song.id}
                currentlyPlaying={currentlyPlaying}
                setCurrentlyPlaying={setCurrentlyPlaying}
                size="md"
            />
        </div>

    )
}

export default SongRow

