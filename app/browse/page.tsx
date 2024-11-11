// Import necessary components
import Tooltip from '@/src/components/socials/Youtube';
import RootLayout from '../layout';
import SongsList from '@/src/lib/SongList'; // Adjust this path based on where SongsList is located

export default function Home() {
  return (
    <RootLayout>
      <div className="flex justify-center">
        {/* Other content can go here */}
        <Tooltip></Tooltip>
      </div>
      
      <div className="flex justify-center">
        {/* Add the SongsList component here */}
        <SongsList />
      </div>
    </RootLayout>
  );
}
