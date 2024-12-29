'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ClientAuthService } from '@/src/services/clientauthService'

interface LoginButtonProps {
  width?: string
  height?: string
  startColor?: string
  endColor?: string
}

export default function LoginButton({
  width = '150px',
  height = '50px',
  startColor = '#3b82f6',
  endColor = '#8b5cf6'
}: LoginButtonProps) {
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuthStatus = async () => {
    setIsLoading(true)
    try {
      const authStatus = ClientAuthService.isAuthenticated()
      console.log('LoginButton: Auth status:', authStatus);
      if (!authStatus) {
        // If not authenticated, try to refresh the token
        const refreshed = await ClientAuthService.refreshTokenIfNeeded()
        console.log('LoginButton: Token refresh attempt:', refreshed);
        setIsAuthenticated(refreshed)
      } else {
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('LoginButton: Error checking auth status:', error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    checkAuthStatus()

    const intervalId = setInterval(checkAuthStatus, 60000) // Check every minute

    return () => clearInterval(intervalId)
  }, [])

  if (!mounted || isLoading) {
    return <div>Loading...</div>
  }

  const label = isAuthenticated ? 'Dashboard' : 'Sign Up'
  const href = isAuthenticated ? '/dashboard' : '/login'

  return (
    <Link href={href} passHref>
      <div
        className="relative inline-block overflow-hidden rounded-xl shadow-lg mr-4"
        style={{ width, height }}
      >
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background: `linear-gradient(90deg, ${startColor}, ${endColor}, ${startColor})`,
            backgroundSize: '200% 100%',
          }}
        ></div>
        <div
          className="relative flex h-full w-full font-bold items-center justify-center hover:text-white font-bold text-zinc-800 transition-transform duration-300 ease-in-out hover:scale-105"
          role="button"
          aria-label={label}
        >
          {label}
        </div>
      </div>
    </Link>
  )
}

