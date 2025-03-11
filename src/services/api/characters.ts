import apiClient from './client'
import { ApiResponse, Character, CharacterFilters } from './types'

// Create character service
const charactersService = {
  getAll: async (filters: CharacterFilters): Promise<ApiResponse<Character>> => {
    const params = new URLSearchParams()

    if (filters.status && filters.status !== 'all') {
      params.append('status', filters.status)
    }

    if (filters.gender && filters.gender !== 'all') {
      params.append('gender', filters.gender)
    }

    if (filters.name) {
      params.append('name', filters.name)
    }

    if (filters.page) {
      params.append('page', filters.page.toString())
    }

    const response = await apiClient.get<ApiResponse<Character>>('/character', {
      params
    })

    return response.data
  },

  getById: async (id: number): Promise<Character> => {
    const response = await apiClient.get<Character>(`/character/${id}`)
    return response.data
  }
}

export default charactersService
