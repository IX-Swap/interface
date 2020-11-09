import { useEffect } from 'react'
import { BaseFilter } from 'v2/types/util'
import { initialFilterValue } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { useQuery, useQueryCache } from 'react-query'

export const AUTHORIZER_FILTER_QUERY_KEY = 'authorizerFilter'

export const useAuthorizerFilter = () => {
  const queryCache = useQueryCache()
  const queryFn = async () => {
    return queryCache.getQueryData<BaseFilter | undefined>(
      AUTHORIZER_FILTER_QUERY_KEY
    )
  }

  useEffect(() => {
    queryCache.setQueryData<BaseFilter>('authorizerFilter', initialFilterValue)

    return () => {
      queryCache.setQueryData<BaseFilter>('authorizerFilter', { status: '' })
    }
  }, []) // eslint-disable-line

  return useQuery<BaseFilter | undefined>(
    [AUTHORIZER_FILTER_QUERY_KEY],
    queryFn
  )
}
