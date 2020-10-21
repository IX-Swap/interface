import { Bank } from 'v2/types/bank'
import { useInfiniteQuery } from 'react-query'
import { useParsedData, UsePaginatedQueryData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import { useServices } from 'v2/services/useServices'
import { PaginatedData } from 'v2/services/api/types'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { GetBanksArgs } from 'v2/app/pages/accounts/types'

export const BANKS_QUERY_KEY = 'banks'

export const useBanksData = (): UsePaginatedQueryData<Bank> => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const uri = `/accounts/banks/list/${user?._id ?? ''}`

  const getBanks = async (queryKey: string, args: GetBanksArgs) => {
    return await apiService.post<PaginatedData<Bank>>(uri, args)
  }
  const { data, ...queryResult } = useInfiniteQuery(
    [BANKS_QUERY_KEY, paginationArgs],
    getBanks
  )

  return {
    ...queryResult,
    data: useParsedData<Bank>(data, '_id')
  }
}
