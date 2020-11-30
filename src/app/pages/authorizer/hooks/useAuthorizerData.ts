import { useAuthRouter } from 'auth/router'
import { PaginatedData } from 'services/api/types'
import { useInfiniteQuery } from 'react-query'
import { useServices } from 'hooks/useServices'
import { useParsedData } from 'hooks/useParsedData'
import { paginationArgs } from 'config/defaults'
import { stripColonFromURLParam } from 'hooks/location/utils'
import { authorizerItemMap } from 'app/pages/authorizer/authorizerItemMap'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'

export const useAuthorizerData = () => {
  const { apiService } = useServices()
  const { params } = useAuthRouter()
  const category = useAuthorizerCategory()
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
