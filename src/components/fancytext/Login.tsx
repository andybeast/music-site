'use client'

import React from 'react'
import { motion } from 'framer-motion'
import GoogleSignInButton from '../buttons/GoogleLogin'

import AnimatedBackground from '@/src/components/animations/Particles'


const LoginPage: React.FC = () => {







  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-700 to-zinc-900 text-white overflow-hidden relative w-full">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          className="max-w-md mx-auto bg-zinc-800 rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-8">



            <div className="mt-6">


              <div className="relative">

                <div className="flex justify-center text-gray-200 items-center mb-8 text-xl">
                  <span className="text-center">Glad you chose to sign up!</span>
                </div>



                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-800 text-zinc-400">Choose a login option below</span>
                </div>
              </div>

              <GoogleSignInButton />


            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage

