import { useEffect } from 'react'
import { BaseFilter } from 'v2/types/util'
import { initialFilterValue } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { queryCache } from 'react-query'

export const useAuthorizerFilter = () => {
  const filter = queryCache.getQueryData<BaseFilter>('authorizerFilter')
  const isAll = filter?.status === ''

  useEffect(() => {
    queryCache.setQueryData<BaseFilter>('authorizerFilter', initialFilterValue)

    return () => {
      queryCache.setQueryData<BaseFilter>('authorizerFilter', { status: '' })
    }
  }, [])

  return { isAll }
}
