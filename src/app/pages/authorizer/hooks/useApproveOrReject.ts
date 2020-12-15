import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { authorizerItemMap } from 'app/pages/authorizer/authorizerItemMap'
import { useAuthorizerRouter } from 'app/pages/authorizer/router'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export interface UseApproveOrRejectArgs {
  id: string
  action: 'approve' | 'reject'
  cacheQueryKey?: any
  payload?: Record<string, any>
}

export const useApproveOrReject = (args: UseApproveOrRejectArgs) => {
  const { action, cacheQueryKey, id, payload } = args
  const queryCache = useQueryCache()
  const category = useAuthorizerCategory()
  const { uri, listRoute } = authorizerItemMap[category]
  const _uri = uri.replace(/\/list.*/, '')
  const url = `${_uri}/${id}/${action}`

  const { replace, params } = useAuthorizerRouter()
  const { apiService, snackbarService } = useServices()
  const canInvalidate =
    cacheQueryKey !== undefined &&
    Array.isArray(cacheQueryKey) &&
    cacheQueryKey.length > 0

  const mutateFn = async () => {
    return await apiService.put(url, payload)
  }

  return useMutation(mutateFn, {
    onSuccess: data => {
      if (canInvalidate) {
        void queryCache.invalidateQueries(cacheQueryKey[0])
      }

      void snackbarService.showSnackbar(data.message, 'success')
      replace(listRoute, params)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
