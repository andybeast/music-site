'use client'

import { useEffect, useState } from 'react'
import './globals.css'
import { CartProvider } from '@/src/components/datasets/CartContext'

import { Music, Search, InfoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/src/components/fancytext/Footer'
import LoginButton from '@/src/components/buttons/Login'
import HeaderButton from '@/src/components/buttons/HeaderButton'
import ShoppingCartLink from '@/src/components/buttons/ShoppingCart'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down at least 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <html lang="en">
      <body
        className="text-gray-900 flex flex-col min-h-screen"
        style={{ position: 'relative' }} // Add this line
      >

        <CartProvider>
        <header
          className={`bg-zinc-900/80 shadow-lg transition-all duration-500 ease-out ${isScrolled ? 'backdrop-blur-md' : 'backdrop-blur-none'
            }`}
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
               

                <Link href="/">
                <Image
                  src="https://i.postimg.cc/cHg0vcV1/logo.png"
                  alt="Designer"
                  width={150}
                  height={150}
                  className="ml-2 hidden sm:flex w-full h-auto"
                />
                </Link>
              </div>



             
              <nav>
                <div className="flex gap-8">
                <div className="hidden sm:flex gap-16 mt-4">
                  
                  
                  <HeaderButton text="About" href= "/info" color="#EAB308"/>
                  
                  <HeaderButton text="Community" href= "/community" color="#EAB308"/>
                 
                  <HeaderButton text="MusAI" href= "/ai" color="#EAB308"/>
                 
                  <HeaderButton text="Browse" href= "/browse" color="#EAB308"/>
                 
                  <HeaderButton text="Contact" href= "/contact" color="#EAB308"/>
                  
                  
                

                </div>
                <div className="mt-3">
                <LoginButton
                      
                      
                      width="100px"
                      height="33px"
                      startColor="#EAB308"
                      endColor="#FDE047"
                      
                    />
                 
                    <ShoppingCartLink/>
               </div>

               </div>

                {/* Mobile Navigation */}
                <div className="sm:hidden flex items-center">
                  <Link href="/">
                    <button className="p-4 bg-blue-300">
                      <Music className="w-8 h-8" />
                    </button>
                  </Link>
                  <Link href="/browse">
                    <button className="p-4 bg-green-300">
                      <Search className="w-8 h-8" />
                    </button>
                  </Link>
                  <Link href="/info">
                    <button className="p-4 bg-red-300">
                      <InfoIcon className="w-8 h-8" />
                    </button>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </header>

          
        <main className="w-full">{children}</main>
        
        <Footer />
        </CartProvider>
      </body>
    </html>
  )
}