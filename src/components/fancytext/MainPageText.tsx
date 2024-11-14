'use client'

import React from 'react'

const TextWithAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-2 sm:p-2">
      <div
        className="relative w-[300px] h-[200px] sm:w-[800px] sm:h-[600px] flex flex-col justify-center items-center overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #ffcc24 50%, #ffcc24 50%)',
          borderRadius: '50% / 50%',
        }}
      >
        <p className="mb-4 sm:mb-24 text-black text-xl sm:text-3xl font-bold font-sans animate-fade-in italic">
          Find your...
        </p>
        <div className="flex items-center gap-16">
          <div className="text-3xl sm:text-6xl font-semibold font-sans animate-slide-in-1 animation-delay-300 text-black text-shadow">
            Music
          </div>
          <div className="text-3xl sm:text-6xl font-semibold font-sans animate-slide-in-2 animation-delay-500 text-black text-shadow">
            Beats
          </div>
          <div className="text-3xl sm:text-6xl font-semibold font-sans animate-slide-in-3 animation-delay-600 text-black text-shadow">
            Tunes
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextWithAnimation