import { getQueryClient } from '@/lib/get-query-client'
import charactersService from '@/services/api/characters'
import { getCharactersQueryKey } from '@/services/api/query-keys'
import { dehydrate } from '@tanstack/react-query'

export interface CharacterFilters {
  status?: string
  gender?: string
  page: number
}

export interface SearchParams {
  status?: string
  gender?: string
  page?: string
}

export async function fetchCharacters(searchParams: SearchParams) {
  // Process parameters
  const status = searchParams.status || 'all'
  const gender = searchParams.gender || 'all'
  const page = parseInt(searchParams.page || '1', 10)

  // Create filters
  const filters: CharacterFilters = {
    status: status !== 'all' ? status : undefined,
    gender: gender !== 'all' ? gender : undefined,
    page
  }

  // Create QueryClient
  const queryClient = getQueryClient()

  // Prefetch data
  await queryClient.prefetchQuery({
    queryKey: getCharactersQueryKey(filters),
    queryFn: () => charactersService.getAll(filters)
  })

  // Dehydrate React Query state
  return {
    dehydratedState: dehydrate(queryClient),
    filters: {
      status,
      gender,
      page
    }
  }
}
