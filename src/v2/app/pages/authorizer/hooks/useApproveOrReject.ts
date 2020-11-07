import { useAuthorizerCategory } from 'v2/hooks/location/useAuthorizerCategory'
import { authorizerItemMap } from 'v2/app/pages/authorizer/authorizerItemMap'
import { useAuthorizerRouter } from 'v2/app/pages/authorizer/router'
import { useServices } from 'v2/hooks/useServices'
import { queryCache, useMutation } from 'react-query'

export interface UseApproveOrRejectArgs {
  id: string
  action: 'approve' | 'reject'
  cacheQueryKey?: any
  payload?: Record<string, any>
}

export const useApproveOrReject = (args: UseApproveOrRejectArgs) => {
  const { action, cacheQueryKey, id, payload } = args
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
