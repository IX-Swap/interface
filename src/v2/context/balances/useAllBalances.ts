import { useInfiniteQuery } from 'react-query'
import { AssetBalance } from 'v2/types/balance'
import { useUserStore } from 'v2/auth/context'
import { balancesService } from 'v2/context/balances/service'
import { list } from './fakeBalances'
import { UsePaginatedData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'

export const ALL_BALANCES_QUERY_KEY = 'allBalances'

export const useAllBalances = (): UsePaginatedData<AssetBalance> => {
  const { user } = useUserStore()
  const payload = { ...paginationArgs, userId: user?._id }
  const { data, status } = useInfiniteQuery(
    [ALL_BALANCES_QUERY_KEY, payload],
    balancesService.getAllBalances.bind(balancesService)
  )

  return {
    data: { ...useParsedData<AssetBalance>(data, '_id'), list },
    status
  }
}
