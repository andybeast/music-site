'use client'

import { useEffect, useState } from 'react'
import './globals.css'
import MusicButton from '@/src/components/buttons/MusicButton'
import BrowseButton from '@/src/components/buttons/BrowseButton'
import AiButton from '@/src/components/buttons/AiButton'
import { Music, Search, InfoIcon } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/src/components/fancytext/Footer';



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
      <body className="text-gray-900 flex flex-col min-h-screen">
        <header
          className={`bg-yellow-400 shadow-lg transition-all duration-500 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link href= "/">
                <Image 
                  src="https://i.ibb.co/sttx49t/Designer-2-removebg-preview.png"
                  alt="Designer"
                  width={100} // Adjusted width for mobile screens
                  height={100} // Adjusted height for mobile screens
                  className="rounded-full"
                />
                </Link>
                <Image 
                  src="https://i.ibb.co/80NCw56/cropped-image1.png"
                  alt="Designer"
                  width={300} // Adjusted width for mobile screens
                  height={300} // Adjusted height for mobile screens
                  className="ml-2 hidden sm:flex"
                />
                
              </div>
              <nav>
                <ul className="hidden sm:flex space-x-4">
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
                  <li>
                    <AiButton>
                      <Search className="w-6 h-6 mr-2" />
                      Browse
                    </AiButton>
                  </li>
                </ul>
                {/* Mobile Navigation */}
                <div className="sm:hidden flex items-center">
                  <Link href="/"> {/* Link to music page */}
                    <button className="p-4">
                      <Music className="w-8 h-8" />
                    </button>
                  </Link>
                  <Link href="/browse"> {/* Link to browse page */}
                    <button className="p-4">
                      <Search className="w-8 h-8" />
                    </button>
                  </Link>
                  <Link href="/info"> {/* Link to browse page */}
                    <button className="p-4">
                      <InfoIcon className="w-8 h-8" />
                    </button>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </header>

        
        <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>
        
        
      <Footer></Footer>

      </body>
      
     
    </html>
  )
}
