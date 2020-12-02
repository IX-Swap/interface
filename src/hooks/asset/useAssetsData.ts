import { useInfiniteQuery } from 'react-query'
import { AssetType, Asset, GetAssetsArgs } from 'types/asset'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { PaginatedData } from 'services/api/types'
import { assets } from 'config/queryKeys'

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
    [assets.getData, payload],
    getAssets
  )

  return {
    ...rest,
    data: useParsedData<Asset>(data, '_id')
  }
}
