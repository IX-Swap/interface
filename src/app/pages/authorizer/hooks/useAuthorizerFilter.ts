import { useEffect } from 'react'
import { BaseFilter } from 'types/util'
import { initialFilterValue } from 'app/pages/authorizer/hooks/useAuthorizerView'
import { useQuery, useQueryCache } from 'react-query'
import { authorizerQueryKeys } from 'config/queryKeys'

export const useAuthorizerFilter = () => {
  const queryCache = useQueryCache()
  const queryFn = async () => {
    return queryCache.getQueryData<BaseFilter | undefined>(
      authorizerQueryKeys.authorizerFilter
    )
  }

  useEffect(() => {
    queryCache.setQueryData<BaseFilter>(
      authorizerQueryKeys.authorizerFilter,
      initialFilterValue
    )

    return () => {
      queryCache.setQueryData<BaseFilter>(
        authorizerQueryKeys.authorizerFilter,
        { status: '' }
      )
    }
  }, []) // eslint-disable-line

  return useQuery<BaseFilter | undefined>(
    [authorizerQueryKeys.authorizerFilter],
    queryFn
  )
}
