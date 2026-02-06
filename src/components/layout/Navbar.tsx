'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MapPin } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#12121a]/80 backdrop-blur-xl border-b border-[#2a2a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#667eea] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold text-xl hidden sm:block text-white">
              AI Salary<span className="text-[#00d4aa]">Map</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/cities" className="text-gray-300 hover:text-[#00d4aa] transition-colors">
              Cities
            </Link>
            <Link href="/jobs" className="text-gray-300 hover:text-[#00d4aa] transition-colors">
              Jobs
            </Link>
            <Link href="/skills" className="text-gray-300 hover:text-[#00d4aa] transition-colors">
              Skills
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-[#1a1a24] border border-[#2a2a3a]"
          >
            {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#12121a] border-t border-[#2a2a3a]">
          <div className="px-4 py-4 space-y-2">
            <Link href="/cities" className="block px-4 py-2 text-gray-300 hover:text-[#00d4aa]">
              Cities
            </Link>
            <Link href="/jobs" className="block px-4 py-2 text-gray-300 hover:text-[#00d4aa]">
              Jobs
            </Link>
            <Link href="/skills" className="block px-4 py-2 text-gray-300 hover:text-[#00d4aa]">
              Skills
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}