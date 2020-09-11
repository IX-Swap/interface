import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { usePasswordResetStore } from '../context/password-reset'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'

export const useRequestPasswordReset = () => {
  const { authService } = useServices()
  const { setCurrentStep } = usePasswordResetStore()

  return useMutation(authService.requestPasswordReset.bind(authService), {
    onSuccess: () => setCurrentStep(PasswordResetStep.Reset)
  })
}
