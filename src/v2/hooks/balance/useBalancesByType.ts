import { useInfiniteQuery } from 'react-query'
import { AssetBalance } from 'v2/types/balance'
import { useUser } from 'v2/auth/hooks/useUser'
import { balancesService } from 'v2/services/balance'
import { AssetType } from 'v2/services/assets/types'
import { UsePaginatedQueryData, useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'

export const BALANCES_BY_TYPE_QUERY_KEY = 'balancesByAssetId'

export const useBalancesByType = (
  type: AssetType
): UsePaginatedQueryData<AssetBalance> => {
  const { data: user } = useUser()
  const payload = { ...paginationArgs, userId: user?._id, type }
  const { data, ...rest } = useInfiniteQuery(
    [BALANCES_BY_TYPE_QUERY_KEY, payload],
    balancesService.getBalancesByType.bind(balancesService)
  )

  return {
    ...rest,
    data: useParsedData<AssetBalance>(data, '_id')
  }
}
