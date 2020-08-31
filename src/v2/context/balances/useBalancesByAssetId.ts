import { QueryStatus, useInfiniteQuery } from 'react-query'
import { convertDataArrayToMap } from 'v2/context/assets/utils'
import { AssetBalance } from 'v2/types/balance'
import { useUserStore } from 'v2/auth/context'
import { BalancesService } from 'v2/context/balances/service'
import { list } from './fakeBalances'

export const BALANCES_BY_ASSET_ID_QUERY_KEY = 'balancesByAssetId'

interface DataStorage<T> {
  raw: any
  map: { [key: string]: T }
  list: T[]
}

interface UseBalancesByAssetIdReturnType {
  data: DataStorage<AssetBalance>
  status: QueryStatus
}

export const useBalancesByAssetId = (
  assetId: string
): UseBalancesByAssetIdReturnType => {
  const { user } = useUserStore()
  const payload = { userId: user?._id, assetId, skip: 0, limit: 5 }
  const { data, status } = useInfiniteQuery(
    [BALANCES_BY_ASSET_ID_QUERY_KEY, payload],
    BalancesService.getBalancesByAssetId
  )
  const raw = data ?? []
  // const list = convertPaginatedResultToFlatArray<AssetBalance>(raw)
  const map = convertDataArrayToMap<AssetBalance>('_id', list)

  return {
    data: { raw, list, map },
    status
  }
}
