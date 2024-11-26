'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AnimatedBackground from '@/src/components/animations/Particles'
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result) {
        if (result.error) {
          setError(result.error);
        } else {
          router.push('/dashboard');
        }
      } else {
        setError('An unexpected error occurred');
      }
    } else {
      // Register
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
        setError('An unexpected error occurred');
      }
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

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
            <motion.h2
              className="text-3xl font-bold mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isLogin ? 'Login' : 'Register'}
            </motion.h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 bg-zinc-700 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 bg-zinc-700 rounded-md text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                </div>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-yellow-400 text-purple-900 py-2 rounded-md font-bold hover:bg-yellow-300 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? 'Login' : 'Register'}
              </motion.button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  className="ml-1 text-yellow-400 hover:underline focus:outline-none"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Register' : 'Login'}
                </button>
              </p>
            </div>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-800 text-zinc-400">Or continue with</span>
                </div>
              </div>
              <div className="mt-6">
                <motion.button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center px-4 py-2 border border-zinc-600 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-700 hover:bg-zinc-600 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGoogle className="mr-2" />
                  Sign in with Google
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage

