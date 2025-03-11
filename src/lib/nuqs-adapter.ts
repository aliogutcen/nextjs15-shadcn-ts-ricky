// Simple adapter for nuqs 2.4.1
'use client'

export const adapter = {
  parse: (value: string | null) => value,
  serialize: (value: string | null) => value
}
