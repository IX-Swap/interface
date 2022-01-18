import { useMutation } from 'react-query'
import { SignupArgs } from 'types/auth'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'
import { history } from 'config/history'
import { AuthRoute } from 'auth/router/config'

export const useSignup = () => {
  const { apiService, snackbarService } = useServices()
  const url = authURL.register
  const mutateFn = async (args: SignupArgs) => {
    return await apiService.post(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: data => {
      history.push(AuthRoute.successfulSignup)
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
