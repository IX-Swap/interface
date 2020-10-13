import { useInfiniteQuery } from 'react-query'
import { AssetBalance, GetAllBalancesArgs } from 'v2/types/balance'
// import { useUser } from 'v2/auth/hooks/useUser'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import apiService from 'v2/services/api'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const ALL_BALANCES_QUERY_KEY = 'allBalances'

export const useAllBalances = (): UsePaginatedQueryData<AssetBalance> => {
  const { user } = useAuth()
  const payload = { ...paginationArgs, userId: user?._id }
  const getAllBalances = async (queryKey: string, args: GetAllBalancesArgs) => {
    const { userId, ...payload } = args

    return await apiService.post(`/accounts/balance/${userId}`, payload)
  }

  const { data, ...rest } = useInfiniteQuery(
    [ALL_BALANCES_QUERY_KEY, payload],
    getAllBalances
  )

  return { ...rest, data: useParsedData<AssetBalance>(data, 'assetId') }
}
