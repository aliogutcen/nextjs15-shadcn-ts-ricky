import { CharactersContainer } from '@/components/characters-container'
import { PageHeader } from '@/components/page-header'
import { SearchParams } from '@/lib/fetch-characters'
import { fetchCharacterData } from '@/actions/fetch-character-data'

interface HomeProps {
  searchParams: Promise<SearchParams>
}

export default async function Home({ searchParams }: HomeProps) {
  // Resolve searchParams promise
  const resolvedParams = await searchParams
  
  // Server action'ı kullanarak veri çekme
  const { dehydratedState } = await fetchCharacterData(resolvedParams)

  return (
    <div className="container mx-auto py-8 px-4">
      <PageHeader />
      <CharactersContainer dehydratedState={dehydratedState} />
    </div>
  )
}
