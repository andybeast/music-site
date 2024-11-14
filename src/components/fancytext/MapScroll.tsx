'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  { id: 1, title: 'Start', description: 'Begin your journey', x: 50, y: 80 },
  { id: 2, title: 'Checkpoint 1', description: 'First milestone', x: 30, y: 60 },
  { id: 3, title: 'Checkpoint 2', description: 'Halfway there', x: 70, y: 40 },
  { id: 4, title: 'Checkpoint 3', description: 'Almost at the end', x: 40, y: 20 },
  { id: 5, title: 'Finish', description: 'You made it!', x: 80, y: 10 },
]

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']

const FloatingDot = ({ color }: { color: string }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: Math.random() * 20 + 3, // Slightly smaller dots
      height: Math.random() * 20 + 3,
      backgroundColor: color,
      opacity: 0.3,
      left: `${Math.random() * 80 + 10}%`, // Constrain to central 80% horizontally
      top: `${Math.random() * 80 + 10}%`, // Constrain to central 80% vertically
    }}
    animate={{
      x: [0, Math.random() * 50 - 25], // Reduced movement range
      y: [0, Math.random() * 50 - 25],
    }}
    transition={{
      duration: Math.random() * 10 + 5,
      repeat: Infinity,
      repeatType: 'reverse',
    }}
  />
)

export default function MapScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="relative min-h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Floating dots */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 200 }).map((_, i) => (
            <FloatingDot key={i} color={colors[i % colors.length]} />
          ))}
        </div>
        
        {/* Steps */}
        {steps.map((step, index) => {
          const yProgress = useTransform(
            scrollYProgress,
            [index / steps.length, (index + 1) / steps.length],
            [100, 0]
          )
          
          return (
            <motion.div
              key={step.id}
              className="absolute z-10 flex flex-col items-center"
              style={{ 
                left: `${step.x}%`, 
                top: `${step.y}%`,
                y: yProgress,
                opacity: useTransform(yProgress, [100, 50, 0], [0, 1, 1])
              }}
            >
              <motion.div
                className="rounded-lg bg-white p-6 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="mb-2 text-2xl font-bold text-gray-800">{step.title}</h3>
                <p className="text-lg text-gray-600">{step.description}</p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}