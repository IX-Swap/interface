import { useInfiniteQuery } from 'react-query'
import { AssetType, Asset, GetAssetsArgs } from 'types/asset'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { PaginatedData } from 'services/api/types'
import { assetsQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

export const useAssetsData = (
  type?: AssetType,
  customLimit?: number,
  isDeployed?: boolean
): UsePaginatedQueryData<Asset> => {
  let payloadPaginationArgs = paginationArgs

  if (customLimit !== undefined) {
    payloadPaginationArgs = { ...paginationArgs, limit: customLimit }
  }

  let payload: GetAssetsArgs = { ...payloadPaginationArgs, type }

  if (isDeployed !== undefined) {
    payload = { ...payload, isDeployed }
  }

  const getAssets = async (queryKey: string, args: GetAssetsArgs) => {
    const uri = accountsURL.assets.getAll

    return await apiService.post<PaginatedData<Asset>>(uri, {
      ...payloadPaginationArgs,
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
