import { useMutation } from 'react-query'
import { usePasswordResetStore } from '../context/password-reset'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import apiService from 'v2/services/api'
import { RequestPasswordResetArgs } from 'v2/types/auth'

export const useRequestPasswordReset = () => {
  const { setCurrentStep } = usePasswordResetStore()
  const url = '/password/reset/start'
  const mutateFn = async (args: RequestPasswordResetArgs) => {
    return await apiService.post(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => setCurrentStep(PasswordResetStep.Reset)
  })
}
