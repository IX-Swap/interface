import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { authorizerItemMap } from 'app/pages/authorizer/authorizerItemMap'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'

export interface UseApproveOrRejectArgs {
  id: string
  action: 'approve' | 'reject'
  cacheQueryKey?: any
  payload?: Record<string, any>
  listingType?: any
}

export const useApproveOrReject = (args: UseApproveOrRejectArgs) => {
  const { action, cacheQueryKey, id, payload, listingType } = args
  const queryCache = useQueryCache()
  const category = useAuthorizerCategory()
  const { uri, listRoute } = authorizerItemMap[category]
  const _uri = uri.replace(/\/list$/, '')
  console.log(listingType, 'listing')
  console.log(category, 'category')
  const url =
    category === 'virtual-accounts'
      ? `${_uri}/assign/${id}/${action}`
      : category === 'listings' && action === 'approve'
      ? // : listingType === 'OTC' || listingType === 'Exchange' || listingType === 'Exchange/OTC'
        `/exchange/listing/${id}/${action}`
      : `${_uri}/${id}/${action}`

  const { search } = useLocation()
  const { replace } = useHistory()
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
      replace({ pathname: listRoute, search })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
