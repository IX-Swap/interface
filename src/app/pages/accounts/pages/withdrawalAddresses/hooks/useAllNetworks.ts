import { useQuery } from 'react-query'
import apiService from 'services/api'
import { Network } from 'types/networks'
import { withdrawalAddressQueryKeys } from 'config/queryKeys'

export const useAllNetworks = () => {
  const getAllNetworks = async () =>
    await apiService.get<Network[]>(`/blockchain/networks`)

  const { data, ...rest } = useQuery(
    [withdrawalAddressQueryKeys.getAllNetworks],
    getAllNetworks
  )

  return { ...rest, data: data?.data }
}
