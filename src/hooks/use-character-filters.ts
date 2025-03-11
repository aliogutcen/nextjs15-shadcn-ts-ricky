'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

type FilterType = 'status' | 'gender'
export type StatusType = 'alive' | 'dead' | 'unknown' | 'all'
export type GenderType = 'female' | 'male' | 'genderless' | 'unknown' | 'all'

export interface FilterValues {
  status: StatusType
  gender: GenderType
}

export function useCharacterFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const status = (searchParams.get('status') as StatusType) || 'all'
  const gender = (searchParams.get('gender') as GenderType) || 'all'

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      // Reset to page 1 when filters change
      if (name !== 'page') {
        params.delete('page')
      }

      return params.toString()
    },
    [searchParams]
  )

  const applyFilters = useCallback(
    (values: FilterValues) => {
      const params = new URLSearchParams()

      if (values.status && values.status !== 'all') {
        params.set('status', values.status)
      }

      if (values.gender && values.gender !== 'all') {
        params.set('gender', values.gender)
      }

      const queryString = params.toString()
      router.push(queryString ? `/?${queryString}` : '/', { scroll: false })
      return queryString ? `/?${queryString}` : '/'
    },
    [router]
  )

  const resetFilters = useCallback(() => {
    // Tüm filtreleri sıfırla
    router.push('/', { scroll: false })
    return '/'
  }, [router])

  const removeFilter = useCallback(
    (filterType: FilterType) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(filterType)

      // Sayfa parametresini koru, diğer filtreleri sıfırla
      const page = params.get('page')
      params.delete('page')

      // Filtreleri yeniden ekle
      if (filterType === 'status' && gender !== 'all') {
        params.set('gender', gender)
      } else if (filterType === 'gender' && status !== 'all') {
        params.set('status', status)
      }

      // Sayfa parametresini geri ekle
      if (page) {
        params.set('page', page)
      }

      const queryString = params.toString()
      router.push(queryString ? `/?${queryString}` : '/', { scroll: false })
      return queryString ? `/?${queryString}` : '/'
    },
    [searchParams, router, status, gender]
  )

  const hasActiveFilters = status !== 'all' || gender !== 'all'

  return {
    currentFilters: {
      status,
      gender
    },
    hasActiveFilters,
    createQueryString,
    applyFilters,
    resetFilters,
    removeFilter
  }
}
