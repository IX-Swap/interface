import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import User from 'types/user'
import { LoginArgs } from 'types/auth'
import apiService from 'services/api'
import { authURL } from 'config/apiURL'
import { useState } from 'react'
import { useLocation } from 'react-router'

export const useLogin = (referrer?: string) => {
  const [step, setStep] = useState<'login' | 'otp'>('login')
  const [locked, setLocked] = useState(false)
  const [email, setEmail] = useState('')
  const [attempts, setAttempts] = useState(0)
  const resetAttempts = () => {
    // setAttempts(0)
  }
  const { storageService, snackbarService } = useServices()
  const url = authURL.login
  const mutateFn = async (args: LoginArgs) => {
    setEmail(args.email)
    return await apiService.post<User>(url, args)
  }

  const location = useLocation<any>()

  return {
    mutation: useMutation(mutateFn, {
      onSuccess: response => {
        resetAttempts()
        if (response.status === 202) {
          setStep('otp')
        } else {
          const user = response.data

          storageService.set<User>('user', user)
          storageService.set('visitedUrl', [])
          window.location.replace(location?.state?.from ?? '/')
        }
      },
      onError: (error: any) => {
        setAttempts(attempts + 1)
        setLocked(false)
        if (error?.code === 'RECO-RLE291' || error?.code === 'RWC0-70531O') {
          setLocked(true)
        }

        void snackbarService.showSnackbar(error.message, 'error')
      }
    }),
    step: step,
    attempts: attempts,
    resetAttempts: resetAttempts,
    locked: locked,
    email: email
  }
}
