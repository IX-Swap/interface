import { useInfiniteQuery } from 'react-query'
import { AssetType, Asset, GetAssetsArgs } from 'types/asset'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { PaginatedData } from 'services/api/types'

export const ASSETS_QUERY_KEY = 'assets'

export const useAssetsData = (
  type?: AssetType
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
