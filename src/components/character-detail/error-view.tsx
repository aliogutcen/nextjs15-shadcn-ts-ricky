'use client'

import { Button } from '@/components/ui/button'
import { useCharacterDetailQuery } from '@/hooks/queries/use-character-detail-query'
import { useCharacterStore } from '@/store/store'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export function ErrorView() {
  const selectedCharacterId = useCharacterStore((state) => state.selectedCharacterId)
  const { refetch } = useCharacterDetailQuery(selectedCharacterId)

  const refreshCharacterDetail = () => {
    refetch()
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 gap-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.div
          className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 0 0 0 rgba(239, 68, 68, 0.2)',
              '0 0 0 10px rgba(239, 68, 68, 0.2)',
              '0 0 0 0 rgba(239, 68, 68, 0.2)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full bg-gradient-to-r from-[#52E3C2] to-[#3BCEAC] opacity-70 animate-pulse"></div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
          Oops! Something went wrong
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          We couldn&apos;t load the character details. The character might have been teleported to
          another dimension.
        </p>

        <Button
          variant="outline"
          onClick={() => refreshCharacterDetail()}
          className="gap-2 border-[#3BCEAC]/30 hover:bg-[#3BCEAC]/10 hover:text-[#3BCEAC] hover:border-[#3BCEAC] transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </motion.div>
  )
}
