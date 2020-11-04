import { useServices } from 'v2/hooks/useServices'
import { useMutation } from 'react-query'
import User from 'v2/types/user'
import { LoginArgs } from 'v2/types/auth'
import apiService from 'v2/services/api'

export const useLogin = () => {
  const { storageService, snackbarService } = useServices()
  const url = '/auth/sign-in'
  const mutateFn = async (args: LoginArgs) => {
    return await apiService.post<User>(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: response => {
      const user = response.data

      storageService.set<User>('user', user)
      storageService.set<string>('access-token', user.accessToken)
      storageService.set('visitedUrl', [])

      window.location.replace('/')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
