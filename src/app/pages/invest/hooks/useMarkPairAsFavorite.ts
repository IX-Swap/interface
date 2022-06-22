import { useServices } from 'hooks/useServices'
import { useQueryCache } from 'react-query'

export const useMarkPairAsFavorite = () => {
  const { storageService } = useServices()
  const queryCache = useQueryCache()

  const toggleFavorite = (pairId: string) => {
    const favorites = storageService.get<[string] | undefined>(
      'favoritePairs',
      undefined
    )
    const newFavorites =
      favorites === undefined || !favorites.includes(pairId)
        ? [...(favorites ?? []), pairId]
        : favorites.filter((item: string) => item !== pairId)

    void storageService.set('favoritePairs', newFavorites)
    void queryCache.invalidateQueries('favoritePairs')
  }

  return {
    markAsFavorite: toggleFavorite
  }
}
