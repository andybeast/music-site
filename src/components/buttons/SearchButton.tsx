'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type NavigationItem = {
  title: string;
  href: string;
  keywords: string[];
};

const navigationItems: NavigationItem[] = [
  { title: 'Home', href: '/', keywords: ['home', 'main', 'start'] },
  { title: 'About Us', href: '/info', keywords: ['about', 'info', 'company'] },
  { title: 'Products', href: '/products', keywords: ['products', 'items', 'shop'] },
  { title: 'Services', href: '/services', keywords: ['services', 'offerings', 'solutions'] },
  { title: 'Contact', href: '/contact', keywords: ['contact', 'reach', 'support'] },
  { title: 'Blog', href: '/blog', keywords: ['blog', 'articles', 'posts'] },
  { title: 'FAQ', href: '/faq', keywords: ['faq', 'questions', 'help'] },
];

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const filteredItems = navigationItems.filter((item) =>
    item.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase())) ||
    item.title.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLinkClick = (href: string) => {
    setIsOpen(false)
    setQuery('')
    router.push(href)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-sm">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={() => setIsOpen(true)}
            className="w-full p-2 pl-10 rounded-full border-4 border-yellow-400 bg-white text-lg font-bold text-purple-700 placeholder-purple-300 focus:outline-none focus:border-pink-400 transition-all duration-300 shadow-lg"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-3 h-6 w-6 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="shrink-0 p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Search
        </button>
      </div>
      {isOpen && (
        <div 
          className="absolute left-0 right-0 mt-2 w-full bg-white rounded-lg border-4 border-yellow-400 shadow-2xl overflow-hidden"
          style={{ zIndex: 10001 }}
        >
          <ul className="py-2">
            {filteredItems.length === 0 ? (
              <li className="px-4 py-2 text-purple-700 font-bold">No results found.</li>
            ) : (
              filteredItems.map((item) => (
                <li key={item.href} className="px-4 py-2 hover:bg-gradient-to-r from-yellow-200 to-pink-200 transition-all duration-300">
                  <button 
                    className="block w-full h-full font-bold text-purple-700 text-left"
                    onClick={() => handleLinkClick(item.href)}
                  >
                    {item.title}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}