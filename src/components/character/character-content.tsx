'use client'

import { CardContent } from '@/components/ui/card'
import { StatusBadge } from '@/components/character/status-badge'
import { Character } from '@/services/api/types'
import { User, MapPin } from 'lucide-react'

interface CharacterContentProps {
  character: Character
}

export function CharacterContent({ character }: CharacterContentProps) {
  return (
    <CardContent className="p-5">
      <h3 className="font-bold text-lg truncate mb-2">{character.name}</h3>

      <div className="flex items-center gap-2 mb-3">
        <StatusBadge status={character.status} />
        <span className="text-sm font-medium">{character.status}</span>
        <span className="text-sm text-muted-foreground">• {character.species}</span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-muted-foreground">
          <User className="h-3.5 w-3.5 mr-2" />
          <span>{character.gender}</span>
        </div>

        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-2" />
          <span className="truncate">{character.origin.name}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Episodes</span>
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {character.episode?.length || 0}
          </span>
        </div>
      </div>
    </CardContent>
  )
}
