import React, { memo } from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-yellow-400 py-8 w-full relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="relative z-20">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Community</h2>
            <ul className="space-y-2">
              
              <li><Link href="#" className="hover:underline hover:text-green-700">YouTube</Link></li>
              <li><Link href="#" className="hover:underline hover:text-green-700">Instagram</Link></li>
              <li><Link href="#" className="hover:underline hover:text-green-700">TikTok</Link></li>
              <li><Link href="#" className="hover:underline hover:text-green-700">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-red-800 font-bold mb-4">About Lunar Boom</h2>
            <ul className="space-y-2">
              <li><Link href="/info" className="hover:underline hover:text-red-700">About</Link></li>
              <li><Link href="#" className="hover:underline hover:text-red-700">Press and Media</Link></li>
              <li><Link href="#" className="hover:underline hover:text-red-700">Learn More</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-blue-800 font-bold mb-4">Buy and Sell Music</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline hover:text-blue-700">Make an account</Link></li>
              <li><Link href="/selling" className="hover:underline hover:text-blue-700">Selling explained</Link></li>
              <li><Link href="#" className="hover:underline hover:text-blue-700">Browse Music Library</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-purple-700 font-bold mb-4">Help</h2>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:underline">Contact</Link></li>
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-bold mb-4">
            &copy; {new Date().getFullYear()} Lunar Boom. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);