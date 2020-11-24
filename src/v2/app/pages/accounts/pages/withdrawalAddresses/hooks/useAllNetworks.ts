import { useQuery } from 'react-query'
import apiService from 'v2/services/api'
import { Network } from 'v2/types/networks'

export const ALL_NETWORKS_QUERY_KEY = 'allNetworks'

export const useAllNetworks = () => {
  const getAllNetworks = async () =>
    await apiService.get<Network[]>(`/blockchain/networks`)

  const { data, ...rest } = useQuery([ALL_NETWORKS_QUERY_KEY], getAllNetworks)

  return { ...rest, data: data?.data }
}
