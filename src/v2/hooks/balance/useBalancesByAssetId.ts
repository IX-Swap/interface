import { useInfiniteQuery } from 'react-query'
import { AssetBalance, GetBalanceByAssetIdArgs } from 'v2/types/balance'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import apiService from 'v2/services/api'

export const BALANCES_BY_ASSET_ID_QUERY_KEY = 'balancesByAssetId'

export const useBalancesByAssetId = (
  assetId: string
): UsePaginatedQueryData<AssetBalance> => {
  const { user } = useAuth()
  const payload = { ...paginationArgs, userId: user?._id, assetId }
  const getBalancesByAssetId = async (
    queryKey: string,
    args: GetBalanceByAssetIdArgs
  ) => {
    const { assetId, userId, ...payload } = args

    return await apiService.post(
      `/accounts/balance/${userId}/${assetId}`,
      payload
    )
  }

  const { data, ...rest } = useInfiniteQuery(
    [BALANCES_BY_ASSET_ID_QUERY_KEY, payload],
    getBalancesByAssetId
  )

  return {
    ...rest,
    data: useParsedData<AssetBalance>(data, 'assetId')
  }
}
