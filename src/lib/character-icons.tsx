import { Heart, Skull, HelpCircle, User2, UserCircle2, Ghost } from 'lucide-react'
import { ReactNode } from 'react'

type StatusType = 'alive' | 'dead' | 'unknown' | 'all'
type GenderType = 'female' | 'male' | 'genderless' | 'unknown' | 'all'

interface IconConfig {
  icon: ReactNode
  label: string
  colorClass: string
}

// Status icon configurations
const STATUS_ICONS: Record<Exclude<StatusType, 'all'>, IconConfig> = {
  alive: {
    icon: <Heart className="h-4 w-4 text-green-500" />,
    label: 'Alive',
    colorClass: 'text-green-500'
  },
  dead: {
    icon: <Skull className="h-4 w-4 text-red-500" />,
    label: 'Dead',
    colorClass: 'text-red-500'
  },
  unknown: {
    icon: <HelpCircle className="h-4 w-4 text-gray-500" />,
    label: 'Unknown',
    colorClass: 'text-gray-500'
  }
}

// Gender icon configurations
const GENDER_ICONS: Record<Exclude<GenderType, 'all'>, IconConfig> = {
  female: {
    icon: <User2 className="h-4 w-4 text-pink-500" />,
    label: 'Female',
    colorClass: 'text-pink-500'
  },
  male: {
    icon: <UserCircle2 className="h-4 w-4 text-blue-500" />,
    label: 'Male',
    colorClass: 'text-blue-500'
  },
  genderless: {
    icon: <Ghost className="h-4 w-4 text-purple-500" />,
    label: 'Genderless',
    colorClass: 'text-purple-500'
  },
  unknown: {
    icon: <HelpCircle className="h-4 w-4 text-gray-500" />,
    label: 'Unknown',
    colorClass: 'text-gray-500'
  }
}

/**
 * Get status icon based on status value
 */
export function getStatusIcon(value: StatusType) {
  if (value === 'all' || !STATUS_ICONS[value]) return null
  return STATUS_ICONS[value].icon
}

/**
 * Get gender icon based on gender value
 */
export function getGenderIcon(value: GenderType) {
  if (value === 'all' || !GENDER_ICONS[value]) return null
  return GENDER_ICONS[value].icon
}

/**
 * Get full status configuration
 */
export function getStatusConfig(value: StatusType): IconConfig | null {
  if (value === 'all') return null
  return STATUS_ICONS[value]
}

/**
 * Get full gender configuration
 */
export function getGenderConfig(value: GenderType): IconConfig | null {
  if (value === 'all') return null
  return GENDER_ICONS[value]
}

export { STATUS_ICONS, GENDER_ICONS }
