import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { AuthorizerActionArgs } from './types'

export const useReject = (args: AuthorizerActionArgs) => {
  const { uri, id } = args
  const _uri = uri.replace(/\/list.*/, '')
  const url = `${_uri}/${id}/reject`
  const { apiService, snackbarService } = useServices()
  const approve = async () => await apiService.put(url, {})

  return useMutation(approve, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
