import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { AuthorizerActionArgs } from './types'

export interface ApproveArgs {
  comment?: string
  sharedWithUser: boolean
}

export const useApprove = (args: AuthorizerActionArgs) => {
  const { uri, id } = args
  const _uri = uri.replace(/\/list.*/, '')
  const url = `${_uri}/${id}/approve`
  const { apiService, snackbarService } = useServices()
  const approve = async (payload: ApproveArgs) => {
    return await apiService.put(url, payload)
  }

  return useMutation(approve, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
