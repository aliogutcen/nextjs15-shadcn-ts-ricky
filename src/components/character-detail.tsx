'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DetailView } from '@/components/character-detail/detail-view'
import { ErrorView } from '@/components/character-detail/error-view'
import { LoadingView } from '@/components/character-detail/loading-view'
import { useCharacterDetailQuery } from '@/hooks/queries/use-character-detail-query'
import { useCharacterStore } from '@/store/store'
import { useCallback, FC, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Dialog Title Component
interface DialogTitleContentProps {
  isLoading: boolean
  isError: boolean
  name?: string
}

const DialogTitleContent: FC<DialogTitleContentProps> = ({ isLoading, isError, name }) => {
  if (isLoading) {
    return (
      <span className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-[#3BCEAC] animate-pulse"></div>
        Loading...
      </span>
    )
  }

  if (isError) {
    return (
      <span className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        Error
      </span>
    )
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] bg-clip-text text-transparent truncate"
    >
      {name}
    </motion.span>
  )
}

// Close Button Component
interface CloseButtonProps {
  onClick: () => void
}

const CloseButton: FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="absolute right-4 top-4 rounded-full h-8 w-8 hover:bg-[#3BCEAC]/10 hover:text-[#3BCEAC] transition-colors z-20"
    >
      <X className="h-4 w-4" />
    </Button>
  )
}

// Decorative Elements Component
const DecorativeElements: FC = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3BCEAC] via-[#52E3C2] to-[#0E103D]"></div>
      <div className="absolute top-4 left-4 h-6 w-6 rounded-full bg-[#3BCEAC]/10 flex items-center justify-center">
        <Sparkles className="h-3 w-3 text-[#3BCEAC]" />
      </div>
      <div className="absolute bottom-4 right-4 h-6 w-6 rounded-full bg-[#52E3C2]/10 flex items-center justify-center">
        <Sparkles className="h-3 w-3 text-[#52E3C2]" />
      </div>
    </>
  )
}

// Dialog Content Component
interface DialogContentWrapperProps {
  children: React.ReactNode
  onClose: () => void
}

const DialogContentWrapper: FC<DialogContentWrapperProps> = ({ children, onClose }) => {
  return (
    <DialogContent
      className={cn(
        'sm:max-w-[550px] max-h-[90vh] overflow-y-auto p-0 border-none bg-transparent shadow-none',
        '[&>button]:hidden' // Hide the default close button
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="bg-white dark:bg-[#1E1E2C] border border-[#3BCEAC]/20 rounded-xl shadow-xl overflow-hidden relative"
      >
        <DecorativeElements />
        <CloseButton onClick={onClose} />
        {children}
      </motion.div>
    </DialogContent>
  )
}

// Main Character Detail Component
function CharacterDetailComponent() {
  const selectedCharacterId = useCharacterStore((state) => state.selectedCharacterId)
  const isDetailModalOpen = useCharacterStore((state) => state.isDetailModalOpen)
  const { closeDetailModal } = useCharacterStore((state) => state.actions)

  const { data: character, isLoading, isError } = useCharacterDetailQuery(selectedCharacterId)

  const handleClose = useCallback(() => {
    closeDetailModal()
  }, [closeDetailModal])

  const renderContent = () => {
    if (isLoading) return <LoadingView />
    if (isError) return <ErrorView />
    if (character) return <DetailView character={character} />
    return null
  }

  if (!isDetailModalOpen) {
    return null
  }

  return (
    <AnimatePresence>
      {isDetailModalOpen && (
        <Dialog open={isDetailModalOpen} onOpenChange={(open) => !open && handleClose()}>
          <DialogContentWrapper onClose={handleClose}>
            <DialogHeader className="px-6 pt-6 pb-0 relative">
              <DialogTitle className="text-xl font-bold flex items-center gap-2 pr-10">
                <DialogTitleContent
                  isLoading={isLoading}
                  isError={isError}
                  name={character?.name}
                />
              </DialogTitle>
            </DialogHeader>

            <div className="p-6">{renderContent()}</div>
          </DialogContentWrapper>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const CharacterDetail = memo(CharacterDetailComponent)
