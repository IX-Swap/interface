import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useGetSingPassData = () => {
  const { apiService } = useServices()

  const getData = async () => {
    const url = identityURL.individuals.getSingPassData
    return await apiService.get(url)
  }

  const { data, ...rest } = useQuery(identityQueryKeys.singPassData, getData, {
    retry: false
  })

  return {
    data: data?.data,
    ...rest
  }
}
