'use client'
import { useState } from 'react';
import AiLyricGenerator from '@/src/components/datasets/AiLyrics';

import { ArrowLeft } from 'lucide-react'; // Using lucide-react for the back button icon
import Image from 'next/image';
import AnimatedBackground from '@/src/components/animations/Particles';
import AiIdea from '@/src/components/datasets/AiIdea';

// Define the possible views
type View = 'menu' | 'lyrics' | 'rewriter' | 'writer';

export default function Ai() {
  const [currentView, setCurrentView] = useState<View>('menu');

  // Function to render the appropriate component based on currentView
  const renderContent = () => {
    switch (currentView) {
      case 'lyrics':
        return <AiLyricGenerator />;
      case 'rewriter':
        return <AiIdea></AiIdea>;
      case 'writer':
        return <div>sooner</div>;
      default:
        return null;
    }
  };

  // Function to determine the background color based on the current view
  const getBackgroundColor = () => {
    switch (currentView) {
      case 'lyrics':
        return '#4CA3D9';  // Blue for lyrics
      case 'rewriter':
        return 'red';   // Red for rewriter
      case 'writer':
        return 'green'; // Green for writer
      default:
        return 'white'; // Default color (for the menu or other views)
    }
  };

  // Navigation menu component
  const Menu = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 max-w-6xl mx-auto py-4">
      <AnimatedBackground color={getBackgroundColor()} />

      <button
        onClick={() => setCurrentView('writer')}
        className="p-6 bg-green-700 backdrop-blur-sm rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-green-700 hover:to-green-400 transition-all duration-1000 ease-in-out hover:scale-105"
      >
        <h3 className="text-2xl font-bold mb-2 text-black">AI <span className="text-yellow-400">Song Inspiration</span></h3>
        <Image 
          src="https://i.ibb.co/WGQ7KzK/monkey-thinking.jpg" 
          alt="Designer"
          width={100}
          height={100}
          className="rounded-full w-full h-auto"
        />
      </button>
      
      <button
        onClick={() => setCurrentView('rewriter')}
        className="p-6 bg-red-700 backdrop-blur-sm rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-red-700 hover:to-red-400 transition-all duration-1000 ease-in-out hover:scale-105"
      >
        <h3 className="text-2xl font-bold mb-2 text-black">AI <span className="text-yellow-400">Rewriter</span> </h3>
        <Image 
          src="https://i.ibb.co/BGTNtT5/monkey-whiteboard.jpg" 
          alt="Designer"
          width={100}
          height={100}
          className="rounded-full w-full h-auto"
        />
      </button>

      <button
        onClick={() => setCurrentView('lyrics')}
        className="p-6 bg-blue-700 backdrop-blur-sm rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-400 transition-all duration-1000 ease-in-out hover:scale-105"
      >
        <h3 className="text-2xl font-bold mb-2 text-black">AI <span className="text-yellow-400">Lyric Generator</span> </h3>
        <Image 
          src="https://i.ibb.co/ws0G97f/monkey-write.jpg" 
          alt="Designer"
          width={100}
          height={100}
          className="rounded-full w-full h-auto"
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-600 to-zinc-900 py-32">
      <AnimatedBackground color={getBackgroundColor()} />
      <div className="container mx-auto px-4 py-8">
        {/* Header with GlitchText and optional back button */}
        <div className="flex items-center justify-center relative mb-8">
          {currentView !== 'menu' && (
            <button
              onClick={() => setCurrentView('menu')}
              className="absolute left-0 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
              aria-label="Back to menu"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Main content area */}
        <div className="transition-all duration-300 ease-in-out">
          {currentView === 'menu' ? (
            <Menu />
          ) : (
            <div className="max-w-4xl mx-auto">
              {renderContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
