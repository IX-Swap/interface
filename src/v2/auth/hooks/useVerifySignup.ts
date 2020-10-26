import { useMutation } from 'react-query'
import { VerifySignupArgs } from 'v2/types/auth'
import { useServices } from 'v2/hooks/useServices'

export const useVerifySignup = () => {
  const { apiService, snackbarService } = useServices()
  const url = '/auth/registrations/confirm'
  const mutateFn = async (args: VerifySignupArgs) => {
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
