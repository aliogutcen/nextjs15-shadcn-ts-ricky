'use client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CharacterState {
  selectedCharacterId: number | null
  isDetailModalOpen: boolean
  actions: {
    setSelectedCharacterId: (id: number | null) => void
    openDetailModal: () => void
    closeDetailModal: () => void
    viewCharacterDetails: (id: number) => void
    refreshCharacterDetail: () => void
  }
}

export const useCharacterStore = create<CharacterState>()(
  devtools(
    (set, get) => ({
      selectedCharacterId: null,
      isDetailModalOpen: false,
      actions: {
        setSelectedCharacterId: (id) => set({ selectedCharacterId: id }),
        openDetailModal: () => set({ isDetailModalOpen: true }),
        closeDetailModal: () => set({ isDetailModalOpen: false }),
        viewCharacterDetails: (id) =>
          set({
            selectedCharacterId: id,
            isDetailModalOpen: true
          }),
        refreshCharacterDetail: () => {
          // Get current character ID and display details with the same ID again
          // This causes React Query to invalidate the cache and fetch data again
          const currentId = get().selectedCharacterId
          if (currentId) {
            // First set ID to null, then set it again - this triggers React Query
            set({ selectedCharacterId: null })
            setTimeout(() => {
              set({ selectedCharacterId: currentId })
            }, 100)
          }
        }
      }
    }),
    { name: 'character-store' }
  )
)
