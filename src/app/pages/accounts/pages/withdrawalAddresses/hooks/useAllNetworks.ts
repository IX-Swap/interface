import { useQuery } from 'react-query'
import apiService from 'services/api'
import { Network } from 'types/networks'
import { withdrawalAddress } from 'config/queryKeys'

export const useAllNetworks = () => {
  const getAllNetworks = async () =>
    await apiService.get<Network[]>(`/blockchain/networks`)

  const { data, ...rest } = useQuery([withdrawalAddress.getAllNetworks], getAllNetworks)

  return { ...rest, data: data?.data }
}
