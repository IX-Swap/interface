import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { Asset } from 'types/asset'
import { assetsQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

export const useAssetById = (assetId: string): UseQueryData<Asset> => {
  const { apiService } = useServices()
  const uri = accountsURL.assets.getById(assetId)

  const getAsset = async () => await apiService.get<Asset>(uri)
  const { data, ...rest } = useQuery(
    [assetsQueryKeys.getById, assetId],
    getAsset,
    {
      enabled: (assetId ?? '') !== ''
    }
  )

  return {
    ...rest,
    data: data?.data
  }
}
