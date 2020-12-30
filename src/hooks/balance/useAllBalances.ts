import { useInfiniteQuery } from 'react-query'
import { AssetBalance, GetAllBalancesArgs } from 'types/balance'
import { UsePaginatedQueryData, useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import apiService from 'services/api'
import { useAuth } from 'hooks/auth/useAuth'
import { balanceQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

export const useAllBalances = (): UsePaginatedQueryData<AssetBalance> => {
  const { user } = useAuth()
  const payload = { ...paginationArgs, userId: user?._id }
  const getAllBalances = async (queryKey: string, args: GetAllBalancesArgs) => {
    const { userId, ...payload } = args

    return await apiService.post(accountsURL.balance.getAll(userId), payload)
  }

  const { data, ...rest } = useInfiniteQuery(
    [balanceQueryKeys.getAll, payload],
    getAllBalances
  )

  return { ...rest, data: useParsedData<AssetBalance>(data, 'assetId') }
}
