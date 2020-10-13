import { useLocation } from 'react-router-dom'
import { getAuthorizerCategoryFromPath } from 'v2/app/pages/accounts/pages/banks/hooks/useAuthorizerBanks'
import { useAuthRouter } from 'v2/auth/router'
import { PaginatedData } from 'v2/services/api/types'
import { useInfiniteQuery } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { useParsedData } from 'v2/hooks/useParsedData'
import { paginationArgs } from 'v2/config/defaults'
import { stripColonFromURLParam } from 'v2/hooks/location/useDataFromURL'
import { authorizerItemMap } from 'v2/app/pages/authorizer/authorizerItemMap'

export const useAuthorizerData = () => {
  const { pathname } = useLocation()
  const { apiService } = useServices()
  const { params } = useAuthRouter()
  const category = getAuthorizerCategoryFromPath(
    pathname
  ) as keyof typeof authorizerItemMap
  const { uri, paramKey } = authorizerItemMap[category]

  const fetcher = async () => {
    return await apiService.post<PaginatedData<any>>(uri, paginationArgs)
  }

  const { data, ...query } = useInfiniteQuery([uri], fetcher)
  const { map } = useParsedData<any>(data, '_id')
  const itemId = params[stripColonFromURLParam(paramKey)]

  return {
    ...query,
    data: map[itemId],
    category
  }
}
