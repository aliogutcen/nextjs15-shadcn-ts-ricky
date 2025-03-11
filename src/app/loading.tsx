import { CharactersGridSkeleton } from '@/components/loading'

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <div className="h-10 bg-muted rounded w-1/3 mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-1/2 mx-auto animate-pulse"></div>
      </div>

      <div className="p-4 bg-muted/50 rounded-lg animate-pulse h-20"></div>

      <div className="mt-8">
        <CharactersGridSkeleton />
      </div>
    </div>
  )
}
