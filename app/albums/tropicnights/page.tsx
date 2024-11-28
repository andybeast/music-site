// Import necessary components
'use client'

import { AlbumDisplay } from "@/src/lib/AlbumPages";

// Example usage component
const AlbumPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Album: Tropic Nights</h1>
      <AlbumDisplay albumName="Tropic Nights" className="max-w-md" />
    </div>
  );
};

export default function TropicNights() {
  return <AlbumPage />;
}
