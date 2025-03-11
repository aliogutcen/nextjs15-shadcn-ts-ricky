import { fetchCharacters, SearchParams } from '@/lib/fetch-characters'

/**
 * Karakter verilerini çeken ve dehydrated state'i döndüren server action
 *
 * @param searchParams - URL arama parametreleri
 * @returns Dehydrated state ve filtreler
 */
export async function fetchCharacterData(searchParams: SearchParams) {
  // Next.js 15'te searchParams'ı await etmemiz gerekiyor
  const params = await Promise.resolve(searchParams)

  // Server-side veri çekme
  return await fetchCharacters(params)
}
