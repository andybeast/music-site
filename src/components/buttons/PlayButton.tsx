import React, { useState, useEffect } from 'react';

interface PlayButtonProps {
  size?: "md" | "lg";
  songLink: string;
  songId: number;
  currentlyPlaying: number | null;
  setCurrentlyPlaying: React.Dispatch<React.SetStateAction<number | null>>;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  songLink,
  songId,
  currentlyPlaying,
  setCurrentlyPlaying,
  size = "md", // Default to 'md' if no size is provided
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const newAudio = new Audio(songLink);
    setAudio(newAudio);
    return () => {
      newAudio.pause();
    };
  }, [songLink]);

  const handlePlayPause = () => {
    if (audio) {
      if (currentlyPlaying === songId) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
        setIsPlaying(!isPlaying);
      } else {
        if (currentlyPlaying !== null) {
          const previousAudio = new Audio(songLink);
          previousAudio.pause();
        }
        audio.play();
        setCurrentlyPlaying(songId);
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (currentlyPlaying !== songId && audio) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentlyPlaying, songId, audio]);

  const iconSize = size === "lg" ? "h-8 w-8" : "h-8 w-8"; // Dynamically change size based on prop

  return (
    <span
      className="bg-yellow-300 hover:bg-yellow-400 hover:scale-105 shadow-md shadow-black/40 rounded-full flex items-center justify-center text-black p-4"
      onClick={handlePlayPause}
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19h4V5H6v14zM14 5v14h4V5h-4z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7L8 5z" />
        </svg>
      )}
    </span>
  );
};

export default PlayButton;
