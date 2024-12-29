import { albums } from '@/src/lib/albums';
import Image from 'next/image';
import Link from 'next/link';

interface YouMayAlsoLikeProps {
  currentAlbumTitle: string;
}

const YouMayAlsoLike: React.FC<YouMayAlsoLikeProps> = ({ currentAlbumTitle }) => {
  return (
    <div className="w-full p-6 bg-zinc-700 mt-16 pb-16">
      <h3 className="text-2xl font-bold mb-4 text-white">You May Also Like. . .</h3>
      <div className="flex overflow-x-auto space-x-8 overflow-visible pb-8 pt-8 pl-4">
        {albums
          .filter(album => album.title.toLowerCase() !== currentAlbumTitle.toLowerCase())
          .map((album) => (
            <Link key={album.id} href={`/${album.link}`}>
              <div className="flex-shrink-0 w-48 bg-zinc-800 text-white p-4 rounded-lg shadow-md transform transition-transform duration-200 hover:scale-105">
                <Image
                  src={album.image}
                  alt={album.title}
                  width={192}
                  height={192}
                  className="rounded-lg"
                />
                <h4 className="text-lg font-bold mt-2 text-center">{album.title}</h4>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default YouMayAlsoLike;