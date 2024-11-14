// Import necessary components

import RootLayout from '../layout';
import SongsList from '@/src/lib/SongList'; // Adjust this path based on where SongsList is located


export default function Home() {
  return (
    <RootLayout>
      <div className="flex justify-center">
        {/* Other content can go here */}
        
      </div>
      
      <div className="flex justify-center mb-64">
        {/* Add the SongsList component here */}
        <SongsList />
      </div>

      
    </RootLayout>
  );
}
