import { useServices } from 'hooks/useServices'
import { blockchainNetworksURL } from 'config/apiURL'
import { useQuery } from 'react-query'
import { BlockchainSettings } from 'types/blockchain'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const useBlockchainSettings = () => {
  const { getFilterValue } = useQueryFilter()
  const network = getFilterValue('blockchainNetwork')
  const { apiService } = useServices()

  const getBlockchainSettings = async () => {
    return await apiService.get<BlockchainSettings>(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      blockchainNetworksURL.getSettings(network)
    )
  }

  const { data, ...rest } = useQuery(
    ['blockchain-settings', network],
    getBlockchainSettings,
    { enabled: network !== undefined }
  )

  return {
    ...rest,
    data: data?.data
  }
}
