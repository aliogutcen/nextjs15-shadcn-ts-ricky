'use client'

import { CharacterCard } from '@/components/character-card'
import { Character } from '@/services/api/types'

interface CharacterGridProps {
  characters: Character[]
}

export function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  )
}
