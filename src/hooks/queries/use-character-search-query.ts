'use client'

import { useQuery } from '@tanstack/react-query'
import charactersService from '@/services/api/characters'
import { CharacterFilters } from '@/services/api/types'

export function useCharacterSearchQuery(
  searchTerm: string,
  filters: Omit<CharacterFilters, 'name'>
) {
  return useQuery({
    queryKey: ['characters', 'search', searchTerm, filters],
    queryFn: () => charactersService.getAll({ ...filters, name: searchTerm }),
    enabled: searchTerm.length > 0,
    staleTime: 2 * 60 * 1000 // 2 minutes
  })
}
