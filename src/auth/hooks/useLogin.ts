import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import User from 'types/user'
import { LoginArgs } from 'types/auth'
import apiService from 'services/api'
import { authURL } from 'config/apiURL'
import { useState } from 'react'

export const useLogin = () => {
  const [step, setStep] = useState<'login' | 'otp'>('login')
  const { storageService, snackbarService } = useServices()
  const url = authURL.login
  const mutateFn = async (args: LoginArgs) => {
    return await apiService.post<User>(url, args)
  }

  return {
    mutation: useMutation(mutateFn, {
      onSuccess: response => {
        if (response.status === 202) {
          setStep('otp')
        } else {
          const user = response.data

          storageService.set<User>('user', user)
          storageService.set<string>('access-token', user.accessToken)
          storageService.set('visitedUrl', [])

          window.location.replace('/')
        }
      },
      onError: (error: any) => {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }),
    step: step
  }
}
