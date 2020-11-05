import { useEffect } from 'react'
import { BaseFilter } from 'v2/types/util'
import { initialFilterValue } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'
import { queryCache } from 'react-query'

export const isFilterAll = () =>
  queryCache.getQueryData<BaseFilter>('authorizerFilter')?.status === ''

export const useAuthorizerFilter = () => {
  useEffect(() => {
    queryCache.setQueryData<BaseFilter>('authorizerFilter', initialFilterValue)

    return () => {
      queryCache.setQueryData<BaseFilter>('authorizerFilter', { status: '' })
    }
  }, [])
}
