import React, { useEffect, useState } from 'react'

interface Dot {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
}

const AnimatedBackground: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([])

  useEffect(() => {
    const createDots = () => {
      const newDots: Dot[] = []
      for (let i = 0; i < 50; i++) {
        newDots.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25
        })
      }
      setDots(newDots)
    }

    createDots()

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
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-white opacity-50"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground