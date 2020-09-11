import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { useAuthRouter } from 'v2/auth/router'

export const useCompletePasswordReset = () => {
  const { authService } = useServices()
  const { push } = useAuthRouter()

  return useMutation(authService.completePasswordReset.bind(authService), {
    onSuccess: () => push('login'),
    onError: error => alert(error)
  })
}
