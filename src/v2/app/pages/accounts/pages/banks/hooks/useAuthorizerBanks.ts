import { Bank } from 'v2/types/bank'
import { useInfiniteQuery } from 'react-query'
import { useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import { PaginatedData } from 'v2/services/api/types'
import { useServices } from 'v2/services/useServices'
import { useAuthorizerRouter } from 'v2/app/pages/authorizer/router'
import { useLocation } from 'react-router-dom'

export const getAuthorizerCategoryFromPath = (path: string) => {
  const splitted = path.split('/')
  const authorizerIdx = splitted.indexOf('authorizer')

  return splitted[authorizerIdx + 1]
}

export const getBankIdFromPath = (path: string) => {
  const splitted = path.split('/')
  const banksIdx = splitted.indexOf('banks')

  return splitted[banksIdx + 1]
}

export const AUTHORIZER_BANKS_QUERY_KEY = 'banks'

export const useAuthorizerBanks = () => {
  const { pathname } = useLocation()
  const { apiService } = useServices()
  const { data, ...queryResult } = useInfiniteQuery(
    AUTHORIZER_BANKS_QUERY_KEY,
    async () => {
      return await apiService.post<PaginatedData<Bank>>(
        '/accounts/banks/list',
        paginationArgs
      )
    }
  )
  const { map } = useParsedData<Bank>(data, '_id')
  const id = getBankIdFromPath(pathname)

  return {
    ...queryResult,
    data: map[id]
  }
}
