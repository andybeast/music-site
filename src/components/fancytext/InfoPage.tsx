import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import AnimatedBackground from '@/src/components/animations/Particles'
import Link from 'next/link'

interface Fact {
  title: string;
  description: string;
  icon: string;
}

const AboutUs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  })

  const facts: Fact[] = [
    {
      title: "Global Reach",
      description: "We make all types of music, by bringing together creativity, talent and expertise we strive to create quality songs that leave impressions.",
      icon: "🌍"
    },
    {
      title: "Earn money",
      description: "Our platform is designed to allow anyone to profit on music. Buy 100% of the rights to revenue and receive fair, transparent payouts for every stream and download.",
      icon: "🎵"
    },
    {
      title: "Cutting-Edge Technology",
      description: "We leverage the latest in music analysis technology to see how your music is performing, from what sources, and how you compare with competitors.",
      icon: "💻"
    },
    {
      title: "Community Support",
      description: "Join a thriving community of artists, investors, and music lovers. Collaborate, share insights, and grow together in your musical journey.",
      icon: "🤝"
    }
  ]

  const phrases = [
    "enjoy music",
    "connect",
    "analyse music",
    "be kind",
    "build a community"
  ]

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [phrases.length])

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-zinc-700 to-zinc-900 text-white overflow-hidden relative w-full">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About <span className="text-yellow-400">Our Platform</span>
        </motion.h1>
        <motion.p 
          className="text-xl mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover what this platform has to offer and how YOU can benefit!
        </motion.p>
        
        {facts.map((fact, index) => {
          const yProgress = useTransform(scrollYProgress, 
            [index / facts.length, (index + 0.4) / facts.length], 
            [100, 0]
          )
          const opacityProgress = useTransform(scrollYProgress, 
            [index / facts.length, (index + 0.1) / facts.length], 
            [0, 1]
          )

          return (
            <motion.div
              key={index}
              className="mb-32 text-center"
              style={{ y: yProgress, opacity: opacityProgress }}
            >
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {fact.icon}
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">{fact.title}</h2>
              <p className="text-xl max-w-2xl mx-auto">{fact.description}</p>
            </motion.div>
          )
        })}

        <motion.div 
          className="text-center mt-64 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Let's{' '}
            <span className="inline-block w-128 overflow-hidden flex justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentPhraseIndex}
                  className="block text-yellow-400 mb-8"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.5 }}
                >
                  {phrases[currentPhraseIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <Link href="/browse" passHref>
            <div
              className="inline-block bg-yellow-400 text-purple-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition duration-300"
            >
              Get Started
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutUs