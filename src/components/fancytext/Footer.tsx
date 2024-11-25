import React, { memo } from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black py-8 w-full relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="relative z-20">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Community</h2>
            <ul className="space-y-2 text-green-800 hover:text-green-500">
              
              <li><Link href="#" className="hover:underline">YouTube</Link></li>
              <li><Link href="#" className="hover:underline">Instagram</Link></li>
              <li><Link href="#" className="hover:underline">TikTok</Link></li>
              <li><Link href="#" className="hover:underline">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-red-600 font-bold mb-4">About Lunar Boom</h2>
            <ul className="space-y-2 text-red-800 hover:text-red-500">
              <li><Link href="/info" className="hover:underline">About</Link></li>
              <li><Link href="#" className="hover:underline">Press and Media</Link></li>
              <li><Link href="#" className="hover:underline">Learn More</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-blue-600 font-bold mb-4">Buy and Sell Music</h2>
            <ul className="space-y-2 text-blue-800 hover:text-blue-500">
              <li><Link href="#" className="hover:underline ">Make an account</Link></li>
              <li><Link href="/selling" className="hover:underline">Selling explained</Link></li>
              <li><Link href="#" className="hover:underline">Browse Music Library</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-yellow-600 font-bold mb-4">Help</h2>
            <ul className="space-y-2 text-yellow-700 hover:text-yellow-500">
              <li><Link href="#" className="hover:underline">Contact</Link></li>
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-300">
          <p className="text-sm font-bold mb-4">
            &copy; {new Date().getFullYear()} Lunar Boom. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);