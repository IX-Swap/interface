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
  featureCategory?: string
  investorRole?: string
}

export const useApproveOrReject = (args: UseApproveOrRejectArgs) => {
  const {
    action,
    cacheQueryKey,
    id,
    payload,
    listingType,
    featureCategory,
    investorRole
  } = args
  // console.log(listingType,cacheQueryKey, payload, id, 'listingTypelistingType')
  const queryCache = useQueryCache()
  const categoryFromUrl = useAuthorizerCategory()
  const category = featureCategory ?? categoryFromUrl
  const { uri, listRoute } = authorizerItemMap[category]
  const _uri: string = uri.replace(/\/list$/, '')
  // console.log(listingType, 'listing')
  //   console.log(category, 'category')
  const url =
    category === 'virtual-accounts'
      ? `${_uri}/assign/${id}/${action}`
      : category === 'individuals/accreditation'
      ? `/identity/accreditation/individual/${id}/${action}`
      : category === 'corporates/accreditation'
      ? `/identity/accreditation/corporate/${id}/${action}`
      : category === 'corporates/role'
      ? `/identity/corporates/${id}/role/${action}`
      : category === 'listings' && action === 'approve'
      ? // : listingType === 'OTC' || listingType === 'Exchange' || listingType === 'Exchange/OTC'
        `/exchange/listing/${id}/${action}`
      : category === 'listings' && action === 'reject' && listingType === 'OTC'
      ? `/otc/listing/${id}/${action}`
      : `${_uri}/${id}/${action}`
  //   console.log(url, 'url')

  const { search } = useLocation()
  const { replace } = useHistory()
  const { apiService, snackbarService } = useServices()
  const canInvalidate =
    cacheQueryKey !== undefined &&
    Array.isArray(cacheQueryKey) &&
    cacheQueryKey.length > 0

  const mutateFn = async () => {
    let reqPayload = payload

    if (category === 'listings' && action === 'approve') {
      reqPayload = { listingType: listingType }
    }

    if (category === 'corporates/role' && typeof investorRole !== 'undefined') {
      reqPayload = { role: investorRole }
    }

    console.log(investorRole)
    console.log(reqPayload)

    return await apiService.put(url, reqPayload)
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
