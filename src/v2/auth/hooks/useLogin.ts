import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import User from 'v2/types/user'

export const useLogin = () => {
  const { authService, storageService } = useServices()
  const history = useHistory()

  return useMutation(authService.login.bind(authService), {
    onSuccess: response => {
      storageService.set<User>('user', response.data)
      storageService.set('visitedUrl', [])
      history.push('/app')
    }
  })
}
