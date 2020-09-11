import { useInfiniteQuery } from 'react-query'
import { AssetType } from 'v2/services/assets/types'
import { Asset } from 'v2/types/asset'
import { useAssetsService } from 'v2/hooks/useAssetsService'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'

export const ASSETS_QUERY_KEY = 'assets'

export const useAssetsData = (
  type: AssetType
): UsePaginatedQueryData<Asset> => {
  const assetsService = useAssetsService()
  const payload = { ...paginationArgs, type }
  const { data, ...rest } = useInfiniteQuery(
    [ASSETS_QUERY_KEY, payload],
    assetsService.getAssets
  )

  return {
    ...rest,
    data: useParsedData<Asset>(data, '_id')
  }
}
