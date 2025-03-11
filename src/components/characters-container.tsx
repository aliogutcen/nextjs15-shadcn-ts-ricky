import { CharacterFilters } from '@/components/character-filters'
import { CharactersClient } from '@/components/characters-client'
import { HydrateClient } from '@/lib/hydrate-client'
import { DehydratedState } from '@tanstack/react-query'

interface CharactersContainerProps {
  dehydratedState: DehydratedState
}

export function CharactersContainer({ dehydratedState }: CharactersContainerProps) {
  return (
    <HydrateClient state={dehydratedState}>
      <CharacterFilters />
      <CharactersClient />
    </HydrateClient>
  )
}
