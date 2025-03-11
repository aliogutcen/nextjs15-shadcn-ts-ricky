'use client'

import { CharacterDetail } from '@/components/character-detail'
import { Pagination } from '@/components/pagination'
import { CharacterGrid } from '@/components/characters/character-grid'
import { EmptyState } from '@/components/characters/empty-state'
import { ErrorState } from '@/components/characters/error-state'
import { LoadingState } from '@/components/characters/loading-state'
import { useCharactersQuery } from '@/hooks/queries/use-characters-query'
import { useSearchParams } from 'next/navigation'
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

// Helper function to convert error to ApiError
function toApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error
  }

  // If not ApiError, create a default ApiError
  const defaultError: ApiError = {
    message: error instanceof Error ? error.message : 'An unknown error occurred',
    originalError: error instanceof Error ? error : new Error('Unknown error'),
    isNetworkError: false
  }

  return defaultError
}

export function CharactersClient() {
  const searchParams = useSearchParams()

  const status = searchParams.get('status') || 'all'
  const gender = searchParams.get('gender') || 'all'
  const page = parseInt(searchParams.get('page') || '1', 10)

  const { data, isLoading, isError, error, refetch } = useCharactersQuery({
    status: status !== 'all' ? status : undefined,
    gender: gender !== 'all' ? gender : undefined,
    page
  })

  if (isLoading) {
    return <LoadingState />
  }

  if (isError) {
    return <ErrorState error={toApiError(error)} onRetry={() => refetch()} />
  }

  if (!data || !data.results.length) {
    return <EmptyState />
  }

  return (
    <div className="mt-8">
      <CharacterGrid characters={data.results} />

      {data.info && <Pagination currentPage={page} totalPages={data.info.pages} />}

      <CharacterDetail />
    </div>
  )
}
