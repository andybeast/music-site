'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth-status/status', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        setIsAuthenticated(false);
      } else {
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      }
    } catch (error) {
      console.error('LoginButton: Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true)
    checkAuthStatus()

    const intervalId = setInterval(checkAuthStatus, 60000) // Check every minute

    return () => clearInterval(intervalId)
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth-status/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(false);
        router.push('/'); // Redirect to home page after logout
      } else {
        console.error('Logout failed:', data.error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  if (!mounted || isLoading) {
    return (
      <div
        className="relative inline-block overflow-hidden rounded-xl shadow-lg mr-4 bg-gray-200"
        style={{ width, height }}
      >
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          Loading...
        </div>
      </div>
    )
  }

  const label = isAuthenticated ? 'Dashboard' : 'Sign Up'
  const href = isAuthenticated ? '/dashboard' : '/login'

  return (
    <div className="flex items-center">
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
      {isAuthenticated && (
        <div
        className="relative inline-block overflow-hidden rounded-xl shadow-lg ml-4"
        style={{ width, height }}
      >
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background: `linear-gradient(90deg, #ef4444, #dc2626, #ef4444)`,
            backgroundSize: '200% 100%',
          }}
        ></div>
        <button
          onClick={handleLogout}
          className="relative flex h-full w-full font-bold items-center justify-center hover:text-white font-bold text-zinc-800 transition-transform duration-300 ease-in-out hover:scale-105"
          role="button"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    )}
  </div>
  )
}

