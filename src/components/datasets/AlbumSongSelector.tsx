'use client'
import React, { useState, useEffect } from 'react';

interface AlbumSongSelectorProps {
  songs: string[];
  onSelectionChange: (selectedSongs: string[]) => void;
  maxSelectable?: number;
}

const AlbumSongSelector: React.FC<AlbumSongSelectorProps> = ({ songs, onSelectionChange, maxSelectable }) => {
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  useEffect(() => {
    onSelectionChange(selectedSongs);
  }, [selectedSongs, onSelectionChange]);

  const handleSongToggle = (song: string) => {
    setSelectedSongs((prevSelected) => {
      if (prevSelected.includes(song)) {
        return prevSelected.filter((s) => s !== song);
      } else if (!maxSelectable || prevSelected.length < maxSelectable) {
        return [...prevSelected, song];
      }
      return prevSelected;
    });
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Select songs to download {maxSelectable ? `(Max: ${maxSelectable})` : ''}</h4>
      <div className="space-y-2">
        {songs.map((song) => (
          <div key={song} className="flex items-center">
            <input
              type="checkbox"
              id={song}
              checked={selectedSongs.includes(song)}
              onChange={() => handleSongToggle(song)}
              disabled={!selectedSongs.includes(song) && maxSelectable !== undefined && selectedSongs.length >= maxSelectable}
              className="mr-2"
            />
            <label htmlFor={song} className="text-sm">{song}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumSongSelector;

