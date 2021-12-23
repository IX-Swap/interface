import { useInfiniteQuery } from 'react-query'
import { AssetBalance, GetBalanceByAssetIdArgs } from 'types/balance'
import { useAuth } from 'hooks/auth/useAuth'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { balanceQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

export const useBalancesByAssetId = (
  assetId?: string
): UsePaginatedQueryData<AssetBalance> => {
  const { user } = useAuth()
  const payload = { ...paginationArgs, userId: user?._id, assetId }
  const getBalancesByAssetId = async (
    queryKey: string,
    args: GetBalanceByAssetIdArgs
  ) => {
    const { assetId, userId, ...payload } = args

    return await apiService.post(
      accountsURL.balance.getCurrencyBalanceByAssetId(userId, assetId),
      payload
    )
  }

  const { data, ...rest } = useInfiniteQuery(
    [balanceQueryKeys.getByAssetId, payload],
    getBalancesByAssetId,
    { enabled: assetId !== undefined && assetId.length > 0 }
  )

  return {
    ...rest,
    data: useParsedData<AssetBalance>(data, 'assetId')
  }
}
