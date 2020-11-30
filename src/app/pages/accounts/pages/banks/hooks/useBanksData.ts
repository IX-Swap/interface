import { Bank } from 'types/bank'
import { useInfiniteQuery } from 'react-query'
import { useParsedData, UsePaginatedQueryData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import { useServices } from 'hooks/useServices'
import { PaginatedData } from 'services/api/types'
import { useAuth } from 'hooks/auth/useAuth'
import { GetBanksArgs } from 'app/pages/accounts/types'
import { getIdFromObj } from 'helpers/strings'

export const BANKS_QUERY_KEY = 'banks'

export const useBanksData = (): UsePaginatedQueryData<Bank> => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const uri = `/accounts/banks/list/${getIdFromObj(user)}`

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
