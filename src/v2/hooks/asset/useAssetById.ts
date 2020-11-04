import { UseQueryData } from 'v2/hooks/useParsedData'
import { useServices } from 'v2/hooks/useServices'
import { useQuery } from 'react-query'
import { Asset } from 'v2/types/asset'

export const ASSET_BY_ID_KEY = 'asset'

export const useAssetById = (assetId: string): UseQueryData<Asset> => {
  const { apiService } = useServices()
  const uri = `accounts/assets/${assetId}`

  const getAsset = async () => await apiService.get<Asset>(uri)
  const { data, ...rest } = useQuery([ASSET_BY_ID_KEY, assetId], getAsset, {
    enabled: (assetId ?? '') !== ''
  })

  return {
    ...rest,
    data: data?.data
  }
}
