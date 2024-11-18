// Import necessary components
'use client'

import SongsList from '@/src/lib/SongList'; // Adjust this path based on where SongsList is located


export default function Browse() {
  return (
    
      
      
      <div className="flex justify-center bg-gradient-to-br from-yellow-100 to-orange-400 relative z-0">
        {/* Add the SongsList component here */}
        <SongsList />
      </div>

      
   
  );
}
