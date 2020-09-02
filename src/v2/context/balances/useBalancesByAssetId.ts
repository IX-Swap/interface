import { useInfiniteQuery } from 'react-query'
import { AssetBalance } from 'v2/types/balance'
import { useUserStore } from 'v2/auth/context'
import { balancesService } from 'v2/context/balances/service'
import { list } from './fakeBalances'
import { UsePaginatedData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'

export const BALANCES_BY_ASSET_ID_QUERY_KEY = 'balancesByAssetId'

export const useBalancesByAssetId = (
  assetId: string
): UsePaginatedData<AssetBalance> => {
  const { user } = useUserStore()
  const payload = { ...paginationArgs, userId: user?._id, assetId }
  const { data, status } = useInfiniteQuery(
    [BALANCES_BY_ASSET_ID_QUERY_KEY, payload],
    balancesService.getBalancesByAssetId.bind(balancesService)
  )

  return {
    data: { ...useParsedData<AssetBalance>(data, '_id'), list },
    status
  }
}
