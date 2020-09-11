import { banksService } from 'v2/app/pages/accounts/pages/banks/service'
import { Bank } from 'v2/types/bank'
import { useInfiniteQuery } from 'react-query'
import { useParsedData, UsePaginatedQueryData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'

export const BANKS_QUERY_KEY = 'banks'

export const useBanksData = (): UsePaginatedQueryData<Bank> => {
  const { data, ...queryResult } = useInfiniteQuery(
    [BANKS_QUERY_KEY, paginationArgs],
    banksService.getBanks.bind(banksService)
  )

  return {
    ...queryResult,
    data: useParsedData<Bank>(data, '_id')
  }
}
