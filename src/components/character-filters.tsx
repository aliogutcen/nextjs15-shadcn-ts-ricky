'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { RefreshCw, X, Sparkles, Zap, Beaker } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { useCharacterFilters, FilterValues, StatusType, GenderType } from '@/hooks/use-character-filters'
import { getGenderIcon, getStatusIcon } from '@/lib/character-icons'
import { FC, FormEvent, useEffect, useState } from 'react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  }
}

// Filter Badge Component
interface FilterBadgeProps {
  type: 'status' | 'gender'
  value: StatusType | GenderType
  onRemove: () => void
}

const FilterBadge: FC<FilterBadgeProps> = ({ type, value, onRemove }) => {
  const icon = type === 'status' 
    ? getStatusIcon(value as StatusType) 
    : getGenderIcon(value as GenderType)

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <Badge
        variant="secondary"
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gradient-to-r from-[#3BCEAC]/10 to-[#52E3C2]/10 border border-[#3BCEAC]/30 text-[#0E103D] dark:text-white shadow-sm"
      >
        {icon}
        <span className="capitalize">{value}</span>
        <button
          onClick={onRemove}
          className="ml-1.5 rounded-full p-0.5 bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20 transition-colors"
          aria-label={`Remove ${type} filter`}
        >
          <X className="h-3 w-3" />
        </button>
      </Badge>
      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </motion.div>
  )
}

// Filter Header Component
interface FilterHeaderProps {
  hasActiveFilters: boolean
  status: StatusType
  gender: GenderType
  onRemoveFilter: (type: 'status' | 'gender') => void
  onResetFilters: () => void
}

const FilterHeader: FC<FilterHeaderProps> = ({
  hasActiveFilters,
  status,
  gender,
  onRemoveFilter,
  onResetFilters
}) => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4"
      variants={itemVariants}
    >
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-[#3BCEAC]/20 to-[#52E3C2]/30 p-2.5 rounded-full shadow-inner shadow-[#3BCEAC]/10 border border-[#3BCEAC]/10">
          <Beaker className="h-5 w-5 text-[#3BCEAC]" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] bg-clip-text text-transparent flex items-center">
          Dimension Filter
          <motion.div
            className="ml-2 text-xs bg-[#0E103D] text-white px-2 py-0.5 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            C-137
          </motion.div>
        </h2>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {status !== 'all' && (
            <FilterBadge type="status" value={status} onRemove={() => onRemoveFilter('status')} />
          )}
          {gender !== 'all' && (
            <FilterBadge type="gender" value={gender} onRemove={() => onRemoveFilter('gender')} />
          )}
          {/* Reset All Filters Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onResetFilters}
              className="flex items-center gap-1.5 h-8 bg-white/80 dark:bg-[#1E1E2C]/80 border-[#FF6B6B]/30 text-[#FF6B6B] hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] hover:border-[#FF6B6B]/50"
            >
              <RefreshCw className="h-3 w-3" />
              <span className="text-xs">Reset</span>
            </Button>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

// Filter Form Component
interface FilterFormProps {
  status: StatusType
  gender: GenderType
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const FilterForm: FC<FilterFormProps> = ({ status, gender, onSubmit }) => {
  // Local state to track current values with proper typing
  const [currentStatus, setCurrentStatus] = useState<StatusType>(status)
  const [currentGender, setCurrentGender] = useState<GenderType>(gender)

  // Update local state when props change
  useEffect(() => {
    setCurrentStatus(status)
    setCurrentGender(gender)
  }, [status, gender])

  return (
    <form onSubmit={onSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        {/* Status Filter */}
        <div className="space-y-3 md:col-span-5">
          <Label
            htmlFor="status-filter"
            className="text-sm font-medium flex items-center gap-2 text-[#0E103D] dark:text-white"
          >
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2]"></div>
            <span className="font-semibold bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] bg-clip-text text-transparent">
              Status
            </span>
          </Label>
          <Select 
            name="status" 
            value={currentStatus} 
            onValueChange={(value: StatusType) => setCurrentStatus(value)}
          >
            <SelectTrigger
              id="status-filter"
              className="bg-background border-2 border-[#3BCEAC]/20 focus:ring-[#3BCEAC]/30 focus:border-[#3BCEAC] rounded-lg h-11 px-4"
            >
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="border-[#3BCEAC]/20 rounded-lg shadow-lg">
              <SelectItem value="all" className="focus:bg-[#3BCEAC]/10 focus:text-[#0E103D]">
                <div className="flex items-center gap-2">
                  <span>All Statuses</span>
                </div>
              </SelectItem>
              <Separator className="my-1 bg-[#3BCEAC]/10" />
              <SelectItem value="alive" className="focus:bg-[#3BCEAC]/10 focus:text-[#0E103D]">
                <div className="flex items-center gap-2">
                  {getStatusIcon('alive')}
                  <span>Alive</span>
                </div>
              </SelectItem>
              <SelectItem value="dead" className="focus:bg-[#3BCEAC]/10 focus:text-[#0E103D]">
                <div className="flex items-center gap-2">
                  {getStatusIcon('dead')}
                  <span>Dead</span>
                </div>
              </SelectItem>
              <SelectItem value="unknown" className="focus:bg-[#3BCEAC]/10 focus:text-[#0E103D]">
                <div className="flex items-center gap-2">
                  {getStatusIcon('unknown')}
                  <span>Unknown</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender Filter */}
        <div className="space-y-3 md:col-span-5">
          <Label
            htmlFor="gender-filter"
            className="text-sm font-medium flex items-center gap-2 text-[#0E103D] dark:text-white"
          >
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#52E3C2] to-[#3BCEAC]"></div>
            <span className="font-semibold bg-gradient-to-r from-[#52E3C2] to-[#3BCEAC] bg-clip-text text-transparent">
              Gender
            </span>
          </Label>
          <Select 
            name="gender" 
            value={currentGender} 
            onValueChange={(value: GenderType) => setCurrentGender(value)}
          >
            <SelectTrigger
              id="gender-filter"
              className="bg-background border-2 border-[#3BCEAC]/20 focus:ring-[#3BCEAC]/30 focus:border-[#3BCEAC] rounded-lg h-11 px-4"
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="border-[#3BCEAC]/20 rounded-lg shadow-lg">
              <SelectItem value="all" className="focus:bg-[#3BCEAC]/10 focus:text-[#0E103D]">
                <div className="flex items-center gap-2">
                  <span>All Genders</span>
                </div>
              </SelectItem>
              <Separator className="my-1 bg-[#3BCEAC]/10" />
              <SelectItem value="female" className="focus:bg-[#3BCEAC]/10 focus:text-[#0E103D]">
                <div className="flex items-center gap-2">
                  {getGenderIcon('female')}
                  <span>Female</span>
                </div>
              </SelectItem>
              <SelectItem value="male" className="focus:bg-[#3BCEAC]/10 focus:text-[#0E103D]">
                <div className="flex items-center gap-2">
                  {getGenderIcon('male')}
                  <span>Male</span>
                </div>
              </SelectItem>
              <SelectItem value="genderless" className="focus:bg-[#3BCEAC]/10 focus:text-[#0E103D]">
                <div className="flex items-center gap-2">
                  {getGenderIcon('genderless')}
                  <span>Genderless</span>
                </div>
              </SelectItem>
              <SelectItem value="unknown" className="focus:bg-[#3BCEAC]/10 focus:text-[#0E103D]">
                <div className="flex items-center gap-2">
                  {getGenderIcon('unknown')}
                  <span>Unknown</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply Button */}
        <div className="md:col-span-2 flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#3BCEAC] to-[#52E3C2] hover:from-[#52E3C2] hover:to-[#3BCEAC] text-white border-none shadow-md"
            >
              Apply
            </Button>
          </motion.div>
        </div>
      </div>
    </form>
  )
}

// Decorative Elements Component
const DecorativeElements: FC = () => {
  return (
    <>
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3BCEAC] via-[#52E3C2] to-[#0E103D]"></div>

      {/* Decorative corners */}
      <div className="absolute top-3 left-3 h-5 w-5 rounded-full bg-[#3BCEAC]/10 flex items-center justify-center">
        <Sparkles className="h-2.5 w-2.5 text-[#3BCEAC]" />
      </div>
      <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-[#52E3C2]/10 flex items-center justify-center">
        <Sparkles className="h-2.5 w-2.5 text-[#52E3C2]" />
      </div>

      {/* Animated elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0E103D] via-[#52E3C2] to-[#3BCEAC]"></div>
      <div className="absolute bottom-3 left-3 h-5 w-5 rounded-full bg-[#0E103D]/10 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          <Zap className="h-4 w-4 text-[#52E3C2]" />
        </motion.div>
      </div>
    </>
  )
}

// Main Component
export function CharacterFilters() {
  const { currentFilters, hasActiveFilters, applyFilters, resetFilters, removeFilter } = useCharacterFilters()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    // Cast the form values to the correct types
    const statusValue = formData.get('status') as string || 'all'
    const genderValue = formData.get('gender') as string || 'all'
    
    const values: FilterValues = {
      status: statusValue as StatusType,
      gender: genderValue as GenderType
    }

    applyFilters(values)
  }

  const handleRemoveFilter = (type: 'status' | 'gender') => {
    // Client-side routing ile filtreyi kaldır
    removeFilter(type)
  }

  const handleResetFilters = () => {
    // Tüm filtreleri sıfırla
    resetFilters()
  }

  return (
    <motion.div className="mb-8" initial="hidden" animate="visible" variants={containerVariants}>
      <FilterHeader
        hasActiveFilters={hasActiveFilters}
        status={currentFilters.status}
        gender={currentFilters.gender}
        onRemoveFilter={handleRemoveFilter}
        onResetFilters={handleResetFilters}
      />

      {/* Filter Card */}
      <motion.div
        className="relative bg-white dark:bg-[#1E1E2C] border border-[#3BCEAC]/20 rounded-xl shadow-lg overflow-hidden"
        variants={itemVariants}
        whileHover={{ boxShadow: '0 8px 30px rgba(59, 206, 172, 0.15)' }}
        transition={{ duration: 0.3 }}
      >
        <DecorativeElements />
        <FilterForm status={currentFilters.status} gender={currentFilters.gender} onSubmit={handleFormSubmit} />
      </motion.div>
    </motion.div>
  )
}
