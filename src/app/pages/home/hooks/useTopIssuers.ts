import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'

export const useTopIssuers = () => {
  const { apiService } = useServices()
  const uri = homeURL.getTopIssuers

  const getBanks = async () => {
    return await apiService.post<any[]>(uri, {}) // TODO: type properly
  }
  const { data, ...queryResult } = useQuery(
    homeQueryKeys.getTopIssuers,
    getBanks
  )

  return {
    ...queryResult,
    // data: data?.data,
    // TODO: return real data
    isFetching: false,
    isLoading: false,
    isSuccess: true,
    data: [
      { imageURL: '', label: 'Alex Solovev' },
      { imageURL: '', label: 'Binod Nirvan' },
      { imageURL: '', label: 'Marcus Windler' },
      { imageURL: '', label: 'Binod Nirvan' },
      { imageURL: '', label: 'Binod Nirvan' }
    ]
  }
}
