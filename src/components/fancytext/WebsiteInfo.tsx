'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Music, Download, HelpCircle } from 'lucide-react'



interface CountUpProps {
    end: number
    duration?: number
}

const CountUp: React.FC<CountUpProps> = React.memo(({ end, duration = 2000 }) => {
    const [count, setCount] = useState<number>(0)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const ref = useRef<HTMLSpanElement>(null)

    const startAnimation = useCallback(() => {
        let startTime: number | null = null
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime
            const percentage = Math.min(progress / duration, 1)
            setCount(Math.floor(percentage * end))

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrame)
    }, [end, duration])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )
        const currentRef = ref.current 
        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (currentRef) {  // Use the local variable in the cleanup
                observer.unobserve(currentRef)
            }
        }
    }, [isVisible])

    useEffect(() => {
        if (isVisible) {
            return startAnimation()
        }
    }, [isVisible, startAnimation])

    return <span ref={ref}>{count}</span>
})

CountUp.displayName = 'CountUp'

const AnimatedSection: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.1 }
        )
        const currentRef = ref.current
        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (currentRef) {  // Use the local variable in the cleanup
                observer.unobserve(currentRef)
            }
        }
    }, [])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
})
AnimatedSection.displayName = 'AnimatedSection'
const WebsiteInfo: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    return (
        
        <div className="p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
                <AnimatedSection>
                    <motion.div
                        className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Music className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mb-2 sm:mb-4" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2 font-sans">
                            +<CountUp end={100} /> Songs
                        </h2>
                        <p className="text-sm sm:text-xl text-gray-600 font-sans">Explore our vast collection of music</p>
                    </motion.div>
                </AnimatedSection>
                <AnimatedSection>
                    <motion.div
                        className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Download className="w-8 h-8 sm:w-12 sm:h-12 text-green-500 mb-2 sm:mb-4" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2 font-sans">
                            +<CountUp end={20} /> Free Songs
                        </h2>
                        <p className="text-sm sm:text-xl text-gray-600 font-sans">Start your journey with free tracks</p>
                    </motion.div>
                </AnimatedSection>
            </div>
            <AnimatedSection>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                    <motion.div
                        className="flex items-center cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mr-2 sm:mr-4" />
                        <h2 className="text-xl sm:text-4xl font-bold text-gray-800 font-sans">Who are we?</h2>
                        <motion.div
                            className="ml-auto"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                        >
                            ▼
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="mt-2 sm:mt-4"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: isExpanded ? 'auto' : 0,
                            opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{
                            duration: 0.1,


                        }}
                    >
                        <motion.div
                            className="mt-2 sm:mt-4"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: isExpanded ? 'auto' : 0,
                                opacity: isExpanded ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.1,


                            }}
                        >
                            <p className="text-sm sm:text-xl text-gray-700 leading-relaxed font-sans">
                                Lunar Boom is a cutting-edge music distributor and platform that makes quality music accessible, affordable, and easy to use for everyone. With us, you don't have to worry about royalties or copyright issues—we've got it all covered for you!
                            </p>
                            <ul className="mt-2 sm:mt-4 space-y-2 text-sm sm:text-2xl text-gray-700 font-sans">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span> Vast collection of high-quality tracks
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span> Affordable pricing plans that suit everyone
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span> Royalty-free music for your projects
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span> Easy-to-use platform for all your music needs
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </AnimatedSection>
        </div>
       
    )
}

export default WebsiteInfo