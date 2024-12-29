// Import necessary components
'use client'

import { AlbumDisplay } from "@/src/lib/AlbumPages";

// Example usage component
const AlbumPage: React.FC = () => {
  return (
   
      
      <AlbumDisplay albumName="Tropic Nights" className="w-full" />
    
  );
};

export default function TropicNights() {
  return <AlbumPage />;
}
