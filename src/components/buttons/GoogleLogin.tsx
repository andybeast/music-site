'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGoogle } from 'react-icons/fa'
import { ClientAuthService } from '@/src/services/clientauthService'
import { useRouter } from 'next/navigation'

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
].join(" ")

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"

export default function GoogleSignInButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignIn = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
        response_type: 'code',
        scope: SCOPES,
        access_type: 'offline',
        prompt: 'consent',
      })
      router.push(`${GOOGLE_AUTH_URL}?${params.toString()}`)
    }
  }
  

  const updateAuthState = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const authState = await ClientAuthService.isAuthenticated()
      setIsAuthenticated(authState)
    } catch (err) {
      console.error('Authentication check failed:', err)
      setError('Failed to check authentication status. Please try again.')
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    updateAuthState()

    const refreshInterval = setInterval(() => {
      ClientAuthService.refreshTokenIfNeeded().then(updateAuthState)
    }, 60000) // Check every minute

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateAuthState()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(refreshInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="w-full flex items-center justify-center px-4 py-2 border border-zinc-600 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-700">
          Loading...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-6">
        <div className="w-full flex items-center justify-center px-4 py-2 border border-red-600 rounded-md shadow-sm text-sm font-medium text-white bg-red-700">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <motion.button
        onClick={handleSignIn}
        className="w-full flex items-center justify-center px-4 py-2 border border-zinc-600 rounded-md shadow-sm text-sm font-medium text-white bg-zinc-700 hover:bg-zinc-600 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGoogle className="mr-2" />
        {isAuthenticated ? 'Go to Dashboard' : 'Sign in with Google'}
      </motion.button>
    </div>
  )
}

