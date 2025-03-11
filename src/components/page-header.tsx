'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink, Zap } from 'lucide-react'

export function PageHeader() {
  return (
    <motion.header
      className="py-8 px-4 mb-8 rounded-xl overflow-hidden relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E103D] via-[#3B0F6F] to-[#1E0B43] z-0">
        {/* Portal effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#3BCEAC] opacity-20 animate-pulse" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#52E3C2] opacity-20 animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[10%] left-[5%] w-2 h-2 rounded-full bg-[#3BCEAC] opacity-70" />
          <div className="absolute top-[20%] left-[15%] w-1 h-1 rounded-full bg-[#52E3C2] opacity-70" />
          <div className="absolute top-[15%] left-[25%] w-3 h-3 rounded-full bg-[#3BCEAC] opacity-50" />
          <div className="absolute top-[80%] left-[85%] w-2 h-2 rounded-full bg-[#52E3C2] opacity-70" />
          <div className="absolute top-[60%] left-[75%] w-1 h-1 rounded-full bg-[#3BCEAC] opacity-70" />
          <div className="absolute top-[70%] left-[90%] w-3 h-3 rounded-full bg-[#52E3C2] opacity-50" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-center items-center mb-2">
            <div className="text-xs font-medium text-[#52E3C2] bg-[#52E3C2]/10 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Zap className="h-3 w-3" />
              Rick and Morty API Explorer
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            <span className="text-[#3BCEAC]">Rick and Morty</span>{' '}
            <span className="text-white">Characters</span>
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
            Explore the multiverse and discover all your favorite characters from the Rick and Morty
            universe
          </p>

          <div className="mt-4 text-xs text-white/60">
            Powered by{' '}
            <Link
              href="https://rickandmortyapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#52E3C2] hover:text-[#52E3C2]/80 inline-flex items-center gap-0.5 underline underline-offset-2"
            >
              Rick and Morty API <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
