import { useMutation } from 'react-query'
import { VerifySignupArgs } from 'types/auth'
import { useServices } from 'hooks/useServices'
import { userURL } from 'config/apiURL'

export const useVerifySignup = () => {
  const { apiService, snackbarService } = useServices()
  const url = userURL.registerConfirm
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
