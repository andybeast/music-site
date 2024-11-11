'use client'

import { useEffect, useState } from 'react'
import './globals.css'
import MusicButton from '@/src/components/buttons/MusicButton'
import BrowseButton from '@/src/components/buttons/BrowseButton'
import { Music, Search } from 'lucide-react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <html lang="en">
      <body className="bg-yellow-50 text-gray-900">
        <header
          className={`bg-yellow-400 shadow-lg transition-all duration-500 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow-400">L</span>
                </div>
                <h1 className="text-2xl font-bold">Your Logo</h1>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <MusicButton>
                      <Music className="w-6 h-6 mr-2" />
                      Music
                    </MusicButton>
                  </li>
                  <li>
                    <BrowseButton>
                      <Search className="w-6 h-6 mr-2" />
                      Browse
                    </BrowseButton>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}