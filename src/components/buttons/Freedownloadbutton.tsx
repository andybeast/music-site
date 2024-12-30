import React from 'react';

interface FreeDownloadButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const FreeDownloadButton: React.FC<FreeDownloadButtonProps> = ({ onClick, className = '', disabled = false }) => {
  return (
    <button
      className={`bg-green-500 text-white rounded p-2 mt-4 transition-transform duration-200 ease-in-out hover:scale-110 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      Free Download
    </button>
  );
};

export default FreeDownloadButton;

