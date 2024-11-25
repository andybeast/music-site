'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface LoginButtonProps {
  href: string
  label?: string
  width?: string
  height?: string
  startColor?: string
  endColor?: string
}

export default function Component({
  href,
  label = 'Login',
  width = '150px',
  height = '50px',
  startColor = '#3b82f6',
  endColor = '#8b5cf6'
}: LoginButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Link href={href} passHref>
      <div
        className="relative inline-block overflow-hidden rounded-2xl shadow-lg"
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
          className="relative flex h-full w-full items-center justify-center font-bold text-white transition-transform duration-300 ease-in-out hover:scale-105"
          role="button"
          aria-label={label}
        >
          {label}
        </div>
      </div>
    </Link>
  )
}