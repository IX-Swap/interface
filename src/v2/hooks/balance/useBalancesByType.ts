import { useInfiniteQuery } from 'react-query'
import { AssetBalance, GetBalanceByTypeArgs } from 'v2/types/balance'
import { useUser } from 'v2/auth/hooks/useUser'
import { AssetType } from 'v2/types/asset'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import apiService from 'v2/services/api'

export const BALANCES_BY_TYPE_QUERY_KEY = 'balancesByAssetId'

export const useBalancesByType = (
  type: AssetType
): UsePaginatedQueryData<AssetBalance> => {
  const { data: user } = useUser()
  const payload = { ...paginationArgs, userId: user?._id, type }
  const getBalancesByType = async (
    queryKey: string,
    args: GetBalanceByTypeArgs
  ) => {
    const { userId, ...payload } = args

    return await apiService.post<any>(`/accounts/balance/${userId}`, payload)
  }

  const { data, ...rest } = useInfiniteQuery(
    [BALANCES_BY_TYPE_QUERY_KEY, payload],
    getBalancesByType
  )

  return {
    ...rest,
    data: useParsedData<AssetBalance>(data, '_id')
  }
}
