import { useInfiniteQuery } from 'react-query'
import { AssetBalance, GetAllBalancesArgs } from 'types/balance'
// import { useUser } from 'auth/hooks/useUser'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { useAuth } from 'hooks/auth/useAuth'

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
