import Link from 'next/link'
import { MapPin, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#12121a] border-t border-[#2a2a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#667eea] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <span className="font-bold text-xl text-white">
                AI Salary<span className="text-[#00d4aa]">Map</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Compare AI salaries across 500+ cities worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/cities" className="text-sm text-gray-400 hover:text-[#00d4aa]">Cities</Link></li>
              <li><Link href="/jobs" className="text-sm text-gray-400 hover:text-[#00d4aa]">Jobs</Link></li>
              <li><Link href="/skills" className="text-sm text-gray-400 hover:text-[#00d4aa]">Skills</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#00d4aa]">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#00d4aa]">API</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#00d4aa]">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#00d4aa]">About</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#00d4aa]">Contact</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-[#00d4aa]">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a3a] mt-12 pt-8 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for AI professionals
          </p>
        </div>
      </div>
    </footer>
  )
}