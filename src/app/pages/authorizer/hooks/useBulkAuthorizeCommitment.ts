import { authorizerItemMap } from 'app/pages/authorizer/authorizerItemMap'
import { authorizerURL } from 'config/apiURL'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useHistory, useLocation } from 'react-router'

export const useBulkAuthorizeCommitments = (action: 'approve' | 'reject') => {
  const { apiService, snackbarService } = useServices()
  const { search } = useLocation()
  const { replace } = useHistory()
  const category = useAuthorizerCategory()
  const { listRoute } = authorizerItemMap[category]

  const url = authorizerURL.bulkAuthorizeCommitments(action)
  const authorizeCommitments = async (args: any) => {
    return await apiService.post(url, { commitments: args })
  }

  return useMutation(authorizeCommitments, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Commitments Approved', 'success')
      replace({ pathname: listRoute, search })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
