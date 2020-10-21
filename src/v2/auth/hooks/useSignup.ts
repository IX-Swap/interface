import { useMutation } from 'react-query'
import { SignupArgs } from 'v2/types/auth'
import { useServices } from 'v2/services/useServices'

export const useSignup = () => {
  const { apiService, snackbarService } = useServices()
  const url = '/auth/registrations'
  const mutateFn = async (args: SignupArgs) => {
    return await apiService.post(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
