'use client'

import React, { useEffect, useState } from 'react'

interface Dot {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

interface AnimatedBackgroundProps {
  color?: string // Optional color prop with a default value of white
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ color = 'white' }) => {
  const [dots, setDots] = useState<Dot[]>([])
  const [isClient, setIsClient] = useState(false) // Track if it's the client

  useEffect(() => {
    setIsClient(true) // Set to true on the client side

    const createDots = () => {
      const newDots: Dot[] = []
      for (let i = 0; i < 50; i++) {
        // Generate random values for dots
        newDots.push({
          id: i,
          x: Math.random() * window.innerWidth,  // Random position X
          y: Math.random() * window.innerHeight, // Random position Y
          size: Math.random() * 3 + 1,  // Random size
          speedX: Math.random() * 0.5 - 0.25, // Random speed X
          speedY: Math.random() * 0.5 - 0.25, // Random speed Y
        })
      }
      setDots(newDots)
    }

    if (isClient) {
      createDots()
    }

    const animateDots = () => {
      setDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          x: (dot.x + dot.speedX + window.innerWidth) % window.innerWidth,
          y: (dot.y + dot.speedY + window.innerHeight) % window.innerHeight
        }))
      )
    }

    const intervalId = setInterval(animateDots, 50)

    return () => clearInterval(intervalId)
  }, [isClient]) // Run the effect when it's the client side

  if (!isClient) {
    return null // Avoid rendering anything on the server
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: color, // Use the passed color here
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground
