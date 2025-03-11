'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function LoadingView() {
  return (
    <div className="flex flex-col justify-center items-center p-8 gap-4">
      <motion.div
        className="relative h-24 w-24"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-[#3BCEAC]/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#3BCEAC] border-r-transparent border-b-transparent border-l-transparent"></div>

        {/* Portal effect in the middle */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] opacity-70 blur-sm"></div>
        </motion.div>

        {/* Sparkles */}
        <motion.div
          className="absolute top-0 right-0"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.5,
            ease: 'easeInOut'
          }}
        >
          <Sparkles className="h-5 w-5 text-[#52E3C2]" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-2"
      >
        <p className="bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] bg-clip-text text-transparent font-medium">
          Loading character details...
        </p>
        <div className="flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2]"
              animate={{
                y: [0, -6, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
