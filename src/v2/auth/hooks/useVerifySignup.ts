import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'

export const useVerifySignup = () => {
  const { authService } = useServices()

  return useMutation(authService.verifySignup.bind(authService))
}
