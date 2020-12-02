import { useInfiniteQuery } from 'react-query'
import { AssetBalance, GetBalanceByTypeArgs } from 'types/balance'
import { useAuth } from 'hooks/auth/useAuth'
import { AssetType } from 'types/asset'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { balance } from 'config/queryKeys'

export const useBalancesByType = (
  type: AssetType
): UsePaginatedQueryData<AssetBalance> => {
  const { user } = useAuth()
  const payload = { ...paginationArgs, userId: user?._id, type }
  const getBalancesByType = async (
    queryKey: string,
    args: GetBalanceByTypeArgs
  ) => {
    const { userId, ...payload } = args

    return await apiService.post<any>(`/accounts/balance/${userId}`, payload)
  }

  const { data, ...rest } = useInfiniteQuery(
    [balance.getByType, payload],
    getBalancesByType
  )

  return {
    ...rest,
    data: useParsedData<AssetBalance>(data, 'assetId')
  }
}
