'use client'

import React, { useState, useMemo } from 'react'
import { songs } from './songs'
import Image from 'next/image'
import SongRow from './Songrow'
import { albums } from './albums'
import ChartIcon from '@/src/components/ui/chart';
import InfoBoxIcon from '@/src/components/ui/info';
import LeaveReview from '../components/fancytext/albumpages/review'
import YouMayAlsoLike from '../components/datasets/YoumayLike'
import AddToCartButton from '../components/buttons/AddtoChart'

interface AlbumDisplayProps {
    albumName: string
    className?: string
}

export const AlbumDisplay: React.FC<AlbumDisplayProps> = ({ albumName, className = "" }) => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)

    const albumSongs = useMemo(() => {
        return songs.filter(song => song.album.toLowerCase() === albumName.toLowerCase())
    }, [albumName])

    const albumDetails = useMemo(() => {
        return albums.find(album => album.title.toLowerCase() === albumName.toLowerCase());
    }, [albumName]);


    if (albumSongs.length === 0) {
        return (
            <div className="w-full p-4 bg-white rounded-lg shadow">
                <p className="text-gray-200 text-center">No songs found in this album</p>
            </div>
        )
    }

    const albumImageUrl = albumSongs[0]?.image || ''

    return (
        <div className={`bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-800 rounded-lg shadow-lg ${className}`}>
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 p-6">
                {albumImageUrl && (
                    <Image
                        src={albumImageUrl}
                        alt={albumName}
                        width={300}
                        height={300}
                        className="rounded-lg shadow-md"
                    />
                )}
                <div className="text-center md:text-left">
                    <h2 className="text-lg font-bold uppercase text-gray-500 fade-in-left-2">Album</h2>
                    <h1 className="text-3xl md:text-7xl font-bold mb-2 text-gray-200 fade-in-left-1">{albumName}</h1>
                    <p className="text-gray-500 fade-in-left-2">{albumSongs.length} songs</p>
                </div>
            </div>
            <div className="flex flex-col gap-8 w-full">



                <div className="space-y-4 px-4 border-b-4 border-gray-600">
                    <div className="flex justify-center gap-16 items-center py-2 px-4 w-full">
                        <span className="text-gray-400 w-8 text-left text-lg">#</span>
                        <div className="flex flex-col flex-grow overflow-hidden">
                            <p className="text-xl font-medium text-gray-200 truncate">Title</p>

                        </div>
                        <span className="text-lg text-white w-16 text-left">Plays</span>
                        <span className="text-lg text-white w-16 text-left">Duration</span>
                        <span className="text-lg text-white w-16 text-left">Price</span>
                        <span className="text-lg text-white w-16 text-left">Buy</span>
                        <span className="text-lg text-white w-16 text-left"></span>
                    </div>
                </div>


                <div className="space-y-4 px-4">
                    {albumSongs.map((song, index) => (
                        <SongRow
                            key={song.id}
                            song={song}
                            index={index}
                            currentlyPlaying={currentlyPlaying}
                            setCurrentlyPlaying={setCurrentlyPlaying}
                        />
                    ))}
                </div>
            </div>
            {albumDetails && (
                <div className="flex flex-col md:flex-row justify-center p-4 w-full mt-16">
                    {/* Information Box */}
                    <div className="border text-white p-6 m-4 rounded-lg shadow-lg w-full md:w-1/2">
                        <div className='flex items-center border-b border-zinc-400 mb-6'>

                            <h2 className="text-2xl font-bold mb-2">Album Information</h2>
                            <InfoBoxIcon />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold italic">Title:</p>
                            <p className='text-right'>{albumDetails.title}</p>
                            <p className="font-semibold italic">Artist:</p>
                            <p className='text-right'>Lunar Boom</p>
                            <p className="font-semibold italic">Release Date:</p>
                            <p className='text-right'>{albumDetails.releaseDate}</p>
                            <p className="font-semibold italic">Genre:</p>
                            <p className='text-right'>{albumDetails.genres.join(', ')}</p>

                        </div>
                        <div className="mt-8">
                            <p className="font-semibold text-lg">Description</p>
                            <p>{albumDetails.description}</p>
                        </div>
                    </div>

                    {/* Statistics Section */}
                    <div className="border text-white p-6 m-4 rounded-lg shadow-lg w-full md:w-1/2">
                        <div className='flex items-center border-b border-zinc-400 mb-6'>

                            <h2 className="text-2xl font-bold mb-2">Album Statistics</h2>
                            <ChartIcon />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="font-semibold italic">Total Tracks:</p>
                            <p className='text-right'>{albumSongs.length}</p>
                            <p className="font-semibold italic">Total Duration:</p>
                            <p className='text-right'>{albumDetails.lenght}</p>
                            <p className="font-semibold italic">Average Rating:</p>
                            <p className='text-right'>N/A</p>
                            <p className="font-semibold italic">Number of Reviews:</p>
                            <p className='text-right'>N/A</p>
                            <p className="font-semibold italic">Top Track:</p>
                            <p className='text-right'>{albumDetails.topsong}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full p-6 rounded-lg mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                    <div className="text-center border text-white p-6 rounded-lg shadow-md hover:bg-zinc-600 transition-colors duration-200 cursor-pointer">
                        <h3 className="text-3xl text-yellow-500 font-bold mb-2">Buy Album</h3>
                        <p className="text-gray-100">Purchase the entire album and enjoy all the tracks.</p>
                        {albumDetails && (
                          <AddToCartButton item={{ id: albumDetails.id, name: albumDetails.title, price: albumDetails.price, attribute: albumDetails.attribute, }} />
                        )}
                    </div>


                    <div className="border text-center text-white p-6 rounded-lg shadow-md hover:bg-zinc-600 transition-colors duration-200 cursor-pointer">
                        <h3 className="text-3xl font-bold mb-2 text-yellow-500 ">Invest in Songs</h3>
                        <p className="text-gray-100">Invest in individual songs and earn revenue</p>
                    </div>
                </div>
            </div>

            <LeaveReview></LeaveReview>

            <YouMayAlsoLike currentAlbumTitle={albumName} />
            


        </div>
    )
}

