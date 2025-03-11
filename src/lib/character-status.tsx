import { Heart, Skull, HelpCircle } from 'lucide-react'
import { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export type CharacterStatus = 'alive' | 'dead' | 'unknown'

interface StatusConfig {
  icon: ReactNode
  label: string
  gradientClasses: {
    from: string
    to: string
  }
}

// Status configuration map
const STATUS_CONFIG: Record<CharacterStatus, StatusConfig> = {
  alive: {
    icon: <Heart className="h-3.5 w-3.5 text-white" />,
    label: 'Status: Alive',
    gradientClasses: {
      from: 'from-green-400',
      to: 'to-green-600'
    }
  },
  dead: {
    icon: <Skull className="h-3.5 w-3.5 text-white" />,
    label: 'Status: Dead',
    gradientClasses: {
      from: 'from-red-400',
      to: 'to-red-600'
    }
  },
  unknown: {
    icon: <HelpCircle className="h-3.5 w-3.5 text-white" />,
    label: 'Status: Unknown',
    gradientClasses: {
      from: 'from-gray-400',
      to: 'to-gray-600'
    }
  }
}

interface StatusIndicatorProps {
  status: string
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const normalizedStatus = status.toLowerCase() as CharacterStatus
  const config = STATUS_CONFIG[normalizedStatus] || STATUS_CONFIG.unknown

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`absolute top-3 right-3 h-6 w-6 rounded-full bg-gradient-to-br ${config.gradientClasses.from} ${config.gradientClasses.to} border-2 border-white dark:border-gray-800 shadow-lg z-10 flex items-center justify-center`}
          >
            {config.icon}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className={`bg-gradient-to-r ${config.gradientClasses.from} ${config.gradientClasses.to} border-none text-white`}
        >
          <p className="text-xs font-medium">{config.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function getStatusConfig(status: string): StatusConfig {
  const normalizedStatus = status.toLowerCase() as CharacterStatus
  return STATUS_CONFIG[normalizedStatus] || STATUS_CONFIG.unknown
}
