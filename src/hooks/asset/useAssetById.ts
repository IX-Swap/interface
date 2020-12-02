import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { Asset } from 'types/asset'
import { assets } from 'config/queryKeys'

export const useAssetById = (assetId: string): UseQueryData<Asset> => {
  const { apiService } = useServices()
  const uri = `accounts/assets/${assetId}`

  const getAsset = async () => await apiService.get<Asset>(uri)
  const { data, ...rest } = useQuery([assets.getById, assetId], getAsset, {
    enabled: (assetId ?? '') !== ''
  })

  return {
    ...rest,
    data: data?.data
  }
}
