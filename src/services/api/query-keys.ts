import { CharacterFilters } from './types'

// Query key creation function - can be used on both server and client side
export const getCharactersQueryKey = (filters: CharacterFilters) => [
  'characters',
  {
    status: filters.status !== 'all' ? filters.status : undefined,
    gender: filters.gender !== 'all' ? filters.gender : undefined,
    page: filters.page
  }
]

export const getCharacterDetailQueryKey = (id: number | null) => ['character', id]
