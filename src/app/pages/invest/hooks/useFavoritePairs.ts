import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useFavoritePairs = () => {
  const { storageService } = useServices()

  const fetchFavoritePairs = () => {
    return storageService.get<[string] | undefined>('favoritePairs', undefined)
  }

  const { data } = useQuery('favoritePairs', fetchFavoritePairs)

  return {
    data
  }
}
