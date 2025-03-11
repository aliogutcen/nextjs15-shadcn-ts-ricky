'use client'

import { Character } from '@/types'
import Image from 'next/image'
import { useCharacterStore } from '@/store/store'
import { motion } from 'framer-motion'
import { MapPin, Home, Tv, ExternalLink, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { StatusIndicator } from '@/lib/character-status'
import { FC, memo } from 'react'

interface CharacterCardProps {
  character: Character
}

// Character ID Badge Component
interface CharacterIdBadgeProps {
  id: number
}

const CharacterIdBadge: FC<CharacterIdBadgeProps> = ({ id }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] hover:from-[#3BCEAC]/90 hover:to-[#52E3C2]/90 text-white border-none shadow-md px-2.5 py-1 z-10">
          #{id}
        </Badge>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] border-none text-white"
      >
        <p className="text-xs font-medium">Character ID</p>
      </TooltipContent>
    </Tooltip>
  )
}

// Character Image Component
interface CharacterImageProps {
  src: string
  alt: string
}

const CharacterImage: FC<CharacterImageProps> = ({ src, alt }) => {
  return (
    <div className="relative w-full aspect-square overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        priority
      />
    </div>
  )
}

// Character Info Panel Component
interface CharacterInfoProps {
  character: Character
}

const CharacterInfo: FC<CharacterInfoProps> = ({ character }) => {
  // Get the episode number from the URL
  const getEpisodeNumber = (episodeUrl: string) => {
    const episodeNumber = episodeUrl.split('/').pop()
    return episodeNumber ? `Episode ${episodeNumber}` : 'Unknown'
  }

  return (
    <div className="p-4 bg-white dark:bg-[#1E1E2C] border-t border-[#3BCEAC]/20">
      {/* Character Name */}
      <h3 className="text-xl font-bold text-[#0E103D] dark:text-white truncate group-hover:text-[#3BCEAC] transition-colors mb-3">
        {character.name}
      </h3>

      {/* Character Attributes */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge
          variant="outline"
          className="bg-gradient-to-r from-[#3BCEAC]/10 to-[#52E3C2]/10 border-[#3BCEAC]/30 text-[#0E103D] dark:text-white px-2.5 py-1"
        >
          {character.species}
        </Badge>
        <Badge
          variant="outline"
          className="bg-gradient-to-r from-[#52E3C2]/10 to-[#3BCEAC]/10 border-[#52E3C2]/30 text-[#0E103D] dark:text-white px-2.5 py-1"
        >
          {character.gender}
        </Badge>
      </div>

      {/* Location Info */}
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Home className="h-3.5 w-3.5 text-[#3BCEAC]" />
          <p className="truncate">{character.origin.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-[#52E3C2]" />
          <p className="truncate">{character.location.name}</p>
        </div>
      </div>

      {/* Episode Info */}
      <div className="mt-3 pt-3 border-t border-[#3BCEAC]/20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Tv className="h-3.5 w-3.5 text-[#3BCEAC]" />
          <span>First seen in: {getEpisodeNumber(character.episode[0])}</span>
        </div>
      </div>
    </div>
  )
}

// View Details Button Component
interface ViewDetailsButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ViewDetailsButton: FC<ViewDetailsButtonProps> = ({ onClick }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
      <motion.div
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] text-white px-5 py-2.5 rounded-full font-medium shadow-lg flex items-center gap-2"
        onClick={onClick}
      >
        <span>View Details</span>
        <ExternalLink className="h-4 w-4" />
      </motion.div>
    </div>
  )
}

// Decorative Elements Component
const DecorativeElements: FC = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3BCEAC] via-[#52E3C2] to-[#0E103D] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-3 right-3 h-6 w-6 rounded-full bg-[#3BCEAC]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <Sparkles className="h-3 w-3 text-[#3BCEAC]" />
      </div>
    </>
  )
}

// Main Character Card Component
function CharacterCardComponent({ character }: CharacterCardProps) {
  const { viewCharacterDetails } = useCharacterStore((state) => state.actions)

  const handleViewDetails = () => {
    viewCharacterDetails(character.id)
  }

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 }
        }}
        className="group relative bg-white dark:bg-[#1E1E2C] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-[#3BCEAC]/30"
        onClick={handleViewDetails}
      >
        <DecorativeElements />
        <StatusIndicator status={character.status} />
        <CharacterIdBadge id={character.id} />
        <CharacterImage src={character.image} alt={character.name} />
        <CharacterInfo character={character} />
        <ViewDetailsButton onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation() // Prevent double triggering when clicking the button
          handleViewDetails()
        }} />
      </motion.div>
    </TooltipProvider>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const CharacterCard = memo(CharacterCardComponent)
