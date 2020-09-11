import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'

export const useSignup = () => {
  const { authService } = useServices()

  return useMutation(authService.signup.bind(authService))
}
