'use client'

import { useQuery } from '@tanstack/react-query'
import charactersService from '@/services/api/characters'
import { getCharacterDetailQueryKey } from '@/services/api/query-keys'

export function useCharacterDetailQuery(id: number | null) {
  return useQuery({
    queryKey: getCharacterDetailQueryKey(id),
    enabled: !!id, // Only run the query if id exists
    queryFn: async () => {
      if (!id) throw new Error('Character ID is required')
      return charactersService.getById(id)
    }
  })
}
