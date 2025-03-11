'use client'

import { Character } from '@/services/api/types'
import Image from 'next/image'
import { MapPin, Users, Globe, Calendar, Tv } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { FC, memo } from 'react'
import { getStatusConfig } from '@/lib/character-status'

interface DetailViewProps {
  character: Character
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
}

// Helper function to extract episode number
function getEpisodeNumber(episodeUrl: string): string {
  const match = episodeUrl.match(/\/episode\/(\d+)$/)
  return match ? `EP${match[1]}` : 'Unknown'
}

// Character Image Component
interface CharacterImageProps {
  character: Character
}

const CharacterImage: FC<CharacterImageProps> = ({ character }) => {
  const statusConfig = getStatusConfig(character.status)

  return (
    <motion.div
      className="relative w-full aspect-square max-h-[300px] overflow-hidden rounded-xl"
      variants={itemVariants}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E103D]/80 via-[#0E103D]/30 to-transparent z-10" />
      <Image
        src={character.image}
        alt={character.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
      <motion.div
        className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Badge
          className={`px-3 py-1 text-sm font-medium flex items-center gap-1.5 bg-gradient-to-r ${statusConfig.gradientClasses.from} ${statusConfig.gradientClasses.to} text-white border-none`}
        >
          {statusConfig.icon}
          {character.status}
        </Badge>

        <Badge className="bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] text-white border-none px-3 py-1">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            ID: {character.id}
          </span>
        </Badge>
      </motion.div>
    </motion.div>
  )
}

// Detail Card Component
interface DetailCardProps {
  icon: React.ReactNode
  label: string
  value: string
  gradient: string
  border: string
  fullWidth?: boolean
}

const DetailCard: FC<DetailCardProps> = ({
  icon,
  label,
  value,
  gradient,
  border,
  fullWidth = false
}) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} border ${border} rounded-lg p-3 ${fullWidth ? 'w-full' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/80 dark:bg-[#1E1E2C]/80 p-2 rounded-full shrink-0">{icon}</div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="font-medium truncate">{value}</span>
        </div>
      </div>
    </div>
  )
}

// Character Attributes Component
interface CharacterAttributesProps {
  character: Character
}

const CharacterAttributes: FC<CharacterAttributesProps> = ({ character }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <DetailCard
        icon={<Users className="h-5 w-5 text-[#3BCEAC]" />}
        label="Species"
        value={character.species}
        gradient="from-[#3BCEAC]/10 to-[#3BCEAC]/20"
        border="border-[#3BCEAC]/30"
      />
      <DetailCard
        icon={<Users className="h-5 w-5 text-[#52E3C2]" />}
        label="Gender"
        value={character.gender}
        gradient="from-[#52E3C2]/10 to-[#52E3C2]/20"
        border="border-[#52E3C2]/30"
      />
    </div>
  )
}

// Character Location Component
interface CharacterLocationProps {
  character: Character
}

const CharacterLocation: FC<CharacterLocationProps> = ({ character }) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <DetailCard
        icon={<Globe className="h-5 w-5 text-[#3BCEAC]" />}
        label="Origin"
        value={character.origin.name}
        gradient="from-[#3BCEAC]/10 to-[#52E3C2]/10"
        border="border-[#3BCEAC]/30"
        fullWidth
      />
      <DetailCard
        icon={<MapPin className="h-5 w-5 text-[#52E3C2]" />}
        label="Location"
        value={character.location.name}
        gradient="from-[#52E3C2]/10 to-[#3BCEAC]/10"
        border="border-[#52E3C2]/30"
        fullWidth
      />
    </div>
  )
}

// Character Episodes Component
interface CharacterEpisodesProps {
  character: Character
}

const CharacterEpisodes: FC<CharacterEpisodesProps> = ({ character }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-[#3BCEAC]/10 p-1.5 rounded-full">
          <Tv className="h-4 w-4 text-[#3BCEAC]" />
        </div>
        <span className="text-sm font-medium bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] bg-clip-text text-transparent">
          Episodes ({character.episode.length})
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] text-white border-none px-3 py-1">
          Total: {character.episode.length}
        </Badge>
        {character.episode.length > 0 && (
          <Badge variant="outline" className="bg-[#3BCEAC]/5 border-[#3BCEAC]/30 px-3 py-1">
            First: {getEpisodeNumber(character.episode[0])}
          </Badge>
        )}
        {character.episode.length > 1 && (
          <Badge variant="outline" className="bg-[#52E3C2]/5 border-[#52E3C2]/30 px-3 py-1">
            Last: {getEpisodeNumber(character.episode[character.episode.length - 1])}
          </Badge>
        )}
      </div>
    </div>
  )
}

// Main Detail View Component
function DetailViewComponent({ character }: DetailViewProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-4 sm:gap-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <CharacterImage character={character} />

      {/* Character information */}
      <motion.div className="w-full space-y-4 sm:space-y-5" variants={itemVariants}>
        <CharacterAttributes character={character} />
        <Separator className="bg-[#3BCEAC]/20" />
        <CharacterLocation character={character} />
        <Separator className="bg-[#3BCEAC]/20" />
        <CharacterEpisodes character={character} />
      </motion.div>
    </motion.div>
  )
}

// Memoize the component to prevent unnecessary re-renders
export const DetailView = memo(DetailViewComponent)
