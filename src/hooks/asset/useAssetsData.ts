import { useInfiniteQuery } from 'react-query'
import { AssetType, Asset, GetAssetsArgs } from 'types/asset'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { PaginatedData } from 'services/api/types'
import { assetsQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

export const useAssetsData = (
  type?: AssetType
): UsePaginatedQueryData<Asset> => {
  const payload = { ...paginationArgs, type }
  const getAssets = async (queryKey: string, args: GetAssetsArgs) => {
    const uri = accountsURL.assets.getAll

    return await apiService.post<PaginatedData<Asset>>(uri, {
      ...paginationArgs,
      ...args
    })
  }

  const { data, ...rest } = useInfiniteQuery(
    [assetsQueryKeys.getData, payload],
    getAssets
  )

  return {
    ...rest,
    data: useParsedData<Asset>(data, '_id')
  }
}
