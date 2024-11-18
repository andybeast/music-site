'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'


const TextWithAnimation: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const textItems = [
    { text: 'Music', color: 'text-purple-700' },
    { text: 'Beats', color: 'text-pink-700' },
    { text: 'Tunes', color: 'text-blue-700' },
  ]

  return (
    <div className="min-h-screen w-screen  flex flex-col justify-center items-center p-4">

      

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-white text-2xl md:text-4xl font-bold font-sans italic"
      >
        Find your...
      </motion.p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16 w-full">
        {textItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative"
          >
            <motion.div
              className={`text-4xl md:text-6xl font-bold ${item.color} cursor-pointer transition-all duration-300 ease-in-out`}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {item.text}
            </motion.div>
            {hoveredIndex === index && (
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-white"
                layoutId="underline"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TextWithAnimation