import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <Link href='/checkout'>
      <button
        className={`px-4 py-2 text-black font-bold rounded-md ${className}`}
        {...props}
        style={{
          background: `linear-gradient(90deg, #EAB308, #FDE047, #EAB308)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s infinite',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
        }}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;