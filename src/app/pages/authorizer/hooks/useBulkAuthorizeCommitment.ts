import { authorizerItemMap } from 'app/pages/authorizer/authorizerItemMap'
import { authorizerURL } from 'config/apiURL'
import { authorizerQueryKeys } from 'config/queryKeys'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'

export const useBulkAuthorizeCommitments = (action: 'approve' | 'reject') => {
  const { apiService, snackbarService } = useServices()
  const { search } = useLocation()
  const { replace } = useHistory()
  const category = useAuthorizerCategory()
  const { listRoute } = authorizerItemMap[category]

  const queryCache = useQueryCache()

  const url = authorizerURL.bulkAuthorizeCommitments(action)
  const authorizeCommitments = async (args: any) => {
    return await apiService.post(url, { commitments: args })
  }

  return useMutation(authorizeCommitments, {
    onSuccess: data => {
      void snackbarService.showSnackbar(
        action === 'approve' ? 'Commitments Approved' : 'Commitments Rejected',
        'success'
      )
      replace({ pathname: listRoute, search })
      void queryCache.invalidateQueries(authorizerQueryKeys.getCommitmentsList)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
