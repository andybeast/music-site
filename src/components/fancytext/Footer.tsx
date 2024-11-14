import React, { memo } from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-400 text-white py-4 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-4">
          &copy; 2024 Lunar Boom. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="/contact" className="text-sm hover:underline mr-4">Contact</a>
          <a href="/privacy-policy" className="text-sm hover:underline">Privacy Policy</a>
        </div>
      </div>

      <div className="container mx-auto text-center">
        <div className="mt-2 flex justify-center gap-8">
          <p className="text-sm hover:underline">More</p>
          <p className="text-sm hover:underline">Learn</p>
        </div>
      </div>
    </footer>
  );
}

// Wrap the Footer in React.memo to avoid unnecessary re-renders
export default memo(Footer);
