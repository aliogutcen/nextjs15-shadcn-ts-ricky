import { useQuery } from '@tanstack/react-query'
import { ApiResponse, Character, CharacterFilters } from '@/services/api/types'
import charactersService from '@/services/api/characters'

export function useCharacters(filters: CharacterFilters) {
  return useQuery<ApiResponse<Character>, Error>({
    queryKey: ['characters', filters],
    queryFn: () => charactersService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  })
}
