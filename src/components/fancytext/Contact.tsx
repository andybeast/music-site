'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedBackground from '@/src/components/animations/Particles'
import { FaEnvelope, FaPhone, FaQuestionCircle } from 'react-icons/fa'

const Contact: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement form submission logic here
    console.log('Form submitted:', { name, email, message })
  }

  const commonErrors = [
    {
      title: 'Login Issues',
      description: 'If youre having trouble logging in, try resetting your password or clearing your browser cache.',
    },
    {
      title: 'Payment Problems',
      description: 'For payment-related issues, ensure your payment method is up to date and try again. If the problem persists, contact your bank.',
    },
    {
      title: 'Account Verification',
      description: 'If your account is pending verification, check your email for a verification link or contact support for assistance.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-700 to-zinc-900 text-white overflow-hidden relative w-full">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact <span className="text-yellow-400">Us</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div
            className="bg-zinc-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 bg-zinc-700 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 bg-zinc-700 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  className="w-full px-3 py-2 bg-zinc-700 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 h-32"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-yellow-400 text-purple-900 py-2 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="bg-zinc-800 rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="text-yellow-400 mr-3" />
                <span>support@example.com</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-yellow-400 mr-3" />
                <span>+1 (123) 456-7890</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-6">Common Issues</h2>
            <div className="space-y-4">
              {commonErrors.map((error, index) => (
                <motion.div
                  key={index}
                  className="bg-zinc-700 rounded-md p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <FaQuestionCircle className="text-yellow-400 mr-2" />
                    {error.title}
                  </h3>
                  <p className="text-sm text-zinc-300">{error.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact

