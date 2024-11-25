'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Play } from 'lucide-react';

interface TikTokPlayerProps {
  videoId: string;
  username: string;
  caption: string;
  soundTitle: string;
}

const TikTokPlayer: React.FC<TikTokPlayerProps> = ({ videoId, username, caption, soundTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTikTokScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.TikTok) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load TikTok embed script'));
      document.body.appendChild(script);
    });
  }, []);

  const handlePlay = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loadTikTokScript();
      setIsPlaying(true);
    } catch (err) {
      console.error('Error loading TikTok video:', err);
      setError('Failed to load the video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [loadTikTokScript]);

  useEffect(() => {
    if (isPlaying) {
      const embedContainer = document.getElementById(`tiktok-embed-${videoId}`);
      if (embedContainer && window.TikTok) {
        window.TikTok.loadEmbed(embedContainer);
      }
    }
  }, [isPlaying, videoId]);

  return (
    <div className="relative max-w-[605px] min-w-[325px] aspect-[9/16] rounded-lg overflow-hidden shadow-lg">
      {!isPlaying ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <button
            onClick={handlePlay}
            className="bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Play TikTok video"
          >
            <Play size={32} />
          </button>
        </div>
      ) : (
        <div id={`tiktok-embed-${videoId}`}>
          <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/@${username}/video/${videoId}`}
            data-video-id={videoId}
            style={{ maxWidth: '605px', minWidth: '325px' }}
          >
            <section>
              <a
                target="_blank"
                title={`@${username}`}
                href={`https://www.tiktok.com/@${username}?refer=embed`}
                rel="noopener noreferrer"
              >
                @{username}
              </a>
              <p>{caption}</p>
              <a
                target="_blank"
                title={soundTitle}
                href={`https://www.tiktok.com/music/${soundTitle.replace(/ /g, '-')}-${videoId}?refer=embed`}
                rel="noopener noreferrer"
              >
                ♬ {soundTitle}
              </a>
            </section>
          </blockquote>
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          Loading...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          {error}
        </div>
      )}
    </div>
  );
};

export default TikTokPlayer;

