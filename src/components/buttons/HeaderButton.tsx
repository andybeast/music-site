'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type HeaderButtonProps = {
  text: string;
  href: string;
  color?: string;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ 
  text, 
  href, 
  color = '#3B82F6' // Default to blue if no color is provided
}) => {
  return (
    <Link href={href} passHref>
      <motion.span
        className="relative py-2 text-lg font-bold text-gray-100 hover:text-white transition-colors duration-200 ease-in-out cursor-pointer group"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        {text}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5"
          style={{ backgroundColor: color }}
          variants={{
            rest: { scaleX: 0 },
            hover: { scaleX: 1 }
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.span>
    </Link>
  );
};

export default HeaderButton;

