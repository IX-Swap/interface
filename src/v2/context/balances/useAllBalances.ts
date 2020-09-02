import { QueryStatus, useInfiniteQuery } from 'react-query'
import { convertDataArrayToMap } from 'v2/context/assets/utils'
import { AssetBalance } from 'v2/types/balance'
import { useUserStore } from 'v2/auth/context'
import { balancesService } from 'v2/context/balances/service'
import { list } from './fakeBalances'

export const ALL_BALANCES_QUERY_KEY = 'allBalances'

interface DataStorage<T> {
  raw: any
  map: { [key: string]: T }
  list: T[]
}

interface UseAllBalancesReturnType {
  data: DataStorage<AssetBalance>
  status: QueryStatus
}

export const useAllBalances = (): UseAllBalancesReturnType => {
  const { user } = useUserStore()
  const queryFn = balancesService.getAllBalances.bind(balancesService)
  const payload = { userId: user?._id, skip: 0, limit: 5 }
  const { data, status } = useInfiniteQuery(
    [ALL_BALANCES_QUERY_KEY, payload],
    queryFn
  )
  const raw = data ?? []
  // const list = convertPaginatedResultToFlatArray<AssetBalance>(raw)
  const map = convertDataArrayToMap<AssetBalance>('_id', list)

  return {
    data: { raw, list, map },
    status
  }
}
