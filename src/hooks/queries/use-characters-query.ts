'use client'

import { useQuery } from '@tanstack/react-query'
import charactersService from '@/services/api/characters'
import { CharacterFilters } from '@/services/api/types'
import { getCharactersQueryKey } from '@/services/api/query-keys'
import { ApiError } from '@/services/api/client'

// Helper function to check error type
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'isNetworkError' in error &&
    'originalError' in error
  )
}

export function useCharactersQuery(filters: CharacterFilters) {
  return useQuery({
    queryKey: getCharactersQueryKey(filters),
    queryFn: async () => {
      return await charactersService.getAll(filters)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Check error type
      if (!isApiError(error)) return false

      // Automatically retry up to 3 times for network errors
      if (error.isNetworkError && failureCount < 3) {
        return true
      }

      // Retry for server errors like 404 and 500
      if (error.statusCode && failureCount < 2) {
        return true
      }

      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000) // Exponential backoff
  })
}
