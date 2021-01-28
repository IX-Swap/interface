import { useQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'

export const useTopCorporates = () => {
  const { apiService } = useServices()
  const uri = homeURL.getTopCorporates

  const getBanks = async () => {
    return await apiService.post<any[]>(uri, {}) // TODO: type properly
  }
  const { data, ...queryResult } = useQuery(
    homeQueryKeys.getTopCoporates,
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
      { imageURL: '', label: 'EstateX' },
      { imageURL: '', label: 'InvestaX' },
      { imageURL: '', label: 'DLA Piper' },
      { imageURL: '', label: 'Sul Capital' },
      { imageURL: '', label: 'Amazon' }
    ]
  }
}
