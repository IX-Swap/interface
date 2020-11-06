import { useAuthorizerCategory } from 'v2/hooks/location/useAuthorizerCategory'
import { authorizerItemMap } from 'v2/app/pages/authorizer/authorizerItemMap'
import { useAuthorizerRouter } from 'v2/app/pages/authorizer/router'
import { useServices } from 'v2/hooks/useServices'
import { useMutation } from 'react-query'

export const useApproveOrReject = (
  id: string,
  action: 'approve' | 'reject',
  payload = {}
) => {
  const category = useAuthorizerCategory()
  const { uri, listRoute } = authorizerItemMap[category]
  const _uri = uri.replace(/\/list.*/, '')
  const url = `${_uri}/${id}/${action}`

  const { replace, params } = useAuthorizerRouter()
  const { apiService, snackbarService } = useServices()

  const approve = async () => {
    return await apiService.put(url, payload)
  }

  return useMutation(approve, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      replace(listRoute, params)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
