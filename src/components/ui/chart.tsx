import React from 'react';

const ChartIcon: React.FC = () => {
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
          d="M3 3v18h18M9 17V9m4 8V5m4 12v-6"
        />
      </svg>
    </span>
  );
};

export default ChartIcon;