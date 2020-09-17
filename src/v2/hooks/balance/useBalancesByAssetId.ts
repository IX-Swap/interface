import { useInfiniteQuery } from 'react-query'
import { AssetBalance } from 'v2/types/balance'
import { useUser } from 'v2/auth/hooks/useUser'
import { balancesService } from 'v2/services/balance'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'

export const BALANCES_BY_ASSET_ID_QUERY_KEY = 'balancesByAssetId'

export const useBalancesByAssetId = (
  assetId: string
): UsePaginatedQueryData<AssetBalance> => {
  const { data: user } = useUser()
  const payload = { ...paginationArgs, userId: user?._id, assetId }
  const { data, ...rest } = useInfiniteQuery(
    [BALANCES_BY_ASSET_ID_QUERY_KEY, payload],
    balancesService.getBalancesByAssetId.bind(balancesService)
  )

  return {
    ...rest,
    data: useParsedData<AssetBalance>(data, '_id')
  }
}
