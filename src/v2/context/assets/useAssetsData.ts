import { useInfiniteQuery } from 'react-query'
import { AssetType } from 'v2/context/assets/types'
import { Asset } from 'v2/types/asset'
import { useAssetsService } from 'v2/hooks/useAssetsService'
import { UsePaginatedData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'

export const ASSETS_QUERY_KEY = 'assets'

export const useAssetsData = (type: AssetType): UsePaginatedData<Asset> => {
  const assetsService = useAssetsService()
  const payload = { ...paginationArgs, type }
  const { data, status } = useInfiniteQuery(
    [ASSETS_QUERY_KEY, payload],
    assetsService.getAssets
  )

  return {
    data: useParsedData<Asset>(data, '_id'),
    status
  }
}
