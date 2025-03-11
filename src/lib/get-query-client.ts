import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

// Create a new QueryClient instance for each request
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          refetchOnWindowFocus: false,
          retry: 1
        }
      }
    })
)
