import { useInfiniteQuery } from 'react-query'
import { AssetType, Asset, GetAssetsArgs } from 'v2/types/asset'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import apiService from 'v2/services/api'
import { PaginatedData } from 'v2/services/api/types'

export const ASSETS_QUERY_KEY = 'assets'

export const useAssetsData = (
  type: AssetType
): UsePaginatedQueryData<Asset> => {
  const payload = { ...paginationArgs, type }
  const getAssets = async (queryKey: string, args: GetAssetsArgs) => {
    const uri = '/accounts/assets/list'

    return await apiService.post<PaginatedData<Asset>>(uri, {
      ...paginationArgs,
      ...args
    })
  }

  const { data, ...rest } = useInfiniteQuery(
    [ASSETS_QUERY_KEY, payload],
    getAssets
  )

  return {
    ...rest,
    data: useParsedData<Asset>(data, '_id')
  }
}
