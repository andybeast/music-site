'use client'
import React, { useState, useCallback, useMemo } from 'react';
import FreeDownloadButton from '../buttons/Freedownloadbutton';
import AddToCartButton from '../buttons/AddtoChart';
import AlbumSongSelector from './AlbumSongSelector';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';

function displayNameToApiName(displayName: string): string {
  return displayName.replace(/\s+/g, '_').toLowerCase();
}

function apiNameToDisplayName(apiName: string): string {
  return apiName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

interface Album {
  id: number;
  title: string;
  genres: string[];
  price: number;
  lenght: string;
  description: string;
  releaseDate?: string;
  topsong: string;
  image: string;
  link: string;
  attribute: string;
  songs: string[];
}

interface AlbumSectionProps {
  albumDetails: Album;
  remainingDownloads: number;
  onDownloadComplete: (downloadedCount: number) => void;
}

const AlbumSection: React.FC<AlbumSectionProps> = ({ albumDetails, remainingDownloads, onDownloadComplete }) => {
  const displaySongs = useMemo(() => albumDetails.songs.map(apiNameToDisplayName), [albumDetails.songs]);
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectionChange = useCallback((newSelection: string[]) => {
    setSelectedSongs(newSelection);
  }, []);

  const handleDownload = async () => {
    if (selectedSongs.length > remainingDownloads) {
      setError(`You can only download ${remainingDownloads} more songs. Please adjust your selection.`);
      return;
    }

    setIsDownloading(true);
    setError(null);
    try {
      const apiSongTitles = selectedSongs.map(displayNameToApiName);
      const response = await fetch('/api/free-downloads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          albumId: albumDetails.id,
          songTitles: apiSongTitles,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${albumDetails.title}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        
        onDownloadComplete(selectedSongs.length);
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          router.push('/login');
        } else if (response.status === 403 && errorData.code === 'DOWNLOAD_LIMIT_REACHED') {
          setError(`You have ${errorData.remainingDownloads} free downloads remaining. Please adjust your selection.`);
        } else {
          throw new Error(errorData.error || 'Download failed');
        }
      }
    } catch (error) {
      console.error('Error downloading songs:', error);
      setError(error instanceof Error ? error.message : 'Failed to download songs. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleSongList = () => {
    setShowSongs(!showSongs);
  };

  return (
    <div className="text-center border text-white p-6 rounded-lg shadow-md hover:bg-zinc-600 transition-colors duration-200 cursor-pointer">
      <h3 className="text-3xl text-yellow-500 font-bold mb-2">
        {albumDetails.price === 0 ? 'Free Album' : 'Buy Album'}
      </h3>
      <p className="text-gray-100">
        {albumDetails.price === 0
          ? `Download songs for free. You have ${remainingDownloads} free downloads remaining.`
          : 'Purchase the entire album and enjoy all the tracks.'}
      </p>
      {albumDetails.price === 0 ? (
        <>
          <button
            onClick={toggleSongList}
            className="flex items-center justify-center w-full mt-4 mb-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
          >
            {showSongs ? (
              <>
                <span className="mr-2">Hide Songs</span>
                <ChevronUp size={20} />
              </>
            ) : (
              <>
                <span className="mr-2">Show Songs</span>
                <ChevronDown size={20} />
              </>
            )}
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showSongs ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <AlbumSongSelector 
              songs={displaySongs} 
              onSelectionChange={handleSelectionChange}
              maxSelectable={remainingDownloads}
            />
          </div>
          <FreeDownloadButton 
            onClick={handleDownload} 
            disabled={isDownloading || selectedSongs.length === 0 || selectedSongs.length > remainingDownloads}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      ) : (
        <AddToCartButton
          item={{
            id: albumDetails.id,
            name: albumDetails.title,
            price: albumDetails.price,
            attribute: albumDetails.attribute,
          }}
        />
      )}
    </div>
  );
};

export default AlbumSection;

