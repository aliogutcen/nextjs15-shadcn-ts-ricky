'use client'

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}

export function CharacterCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm border animate-pulse">
      <div className="bg-muted h-48 w-full"></div>
      <div className="p-4">
        <div className="h-5 bg-muted rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-muted rounded w-1/3"></div>
      </div>
    </div>
  )
}

export function CharactersGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <CharacterCardSkeleton key={index} />
      ))}
    </div>
  )
}
