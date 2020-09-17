import { useInfiniteQuery } from 'react-query'
import { AssetBalance } from 'v2/types/balance'
import { useUser } from 'v2/auth/hooks/useUser'
import { balancesService } from 'v2/services/balance'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'

export const ALL_BALANCES_QUERY_KEY = 'allBalances'

export const useAllBalances = (): UsePaginatedQueryData<AssetBalance> => {
  const { data: user } = useUser()
  const payload = { ...paginationArgs, userId: user?._id }
  const { data, ...rest } = useInfiniteQuery(
    [ALL_BALANCES_QUERY_KEY, payload],
    balancesService.getAllBalances.bind(balancesService)
  )

  return {
    ...rest,
    data: useParsedData<AssetBalance>(data, '_id')
  }
}
