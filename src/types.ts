export type Character = {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export type CharacterFilters = {
  status?: string
  gender?: string
  page?: number
  name?: string
}

export type ApiResponse<T> = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: T[]
}
