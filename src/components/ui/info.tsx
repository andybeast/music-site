import React from 'react';

const InfoBoxIcon: React.FC = () => {
  return (
    <span className="text-xl text-gray-100 w-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-8 h-8 mb-2 ml-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </span>
  );
};

export default InfoBoxIcon;