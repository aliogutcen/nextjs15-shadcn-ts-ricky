'use client'

import { Character } from '@/services/api/types'
import { create } from 'zustand'

interface CharacterState {
  selectedCharacter: Character | null
  isDetailOpen: boolean
  selectCharacter: (character: Character) => void
  closeDetail: () => void
}

export const useCharacterStore = create<CharacterState>((set) => ({
  selectedCharacter: null,
  isDetailOpen: false,
  selectCharacter: (character) => set({ selectedCharacter: character, isDetailOpen: true }),
  closeDetail: () => set({ isDetailOpen: false })
}))
