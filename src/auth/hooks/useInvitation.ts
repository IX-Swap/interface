import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'

export const useInvitation = (roleId: string) => {
  const { apiService, snackbarService } = useServices()
  const url = authURL.declineInvitation(roleId)
  const mutateFn = async () => {
    return await apiService.put(url, {})
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      void snackbarService.showSnackbar(
        'Invitation successfully declined',
        'success'
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
