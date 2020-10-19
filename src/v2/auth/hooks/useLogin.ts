import { useServices } from 'v2/services/useServices'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import User from 'v2/types/user'
import { LoginArgs } from 'v2/types/auth'
import apiService from 'v2/services/api'
import { AppRole, hasRole } from 'v2/helpers/acl'

export const useLogin = () => {
  const { storageService, socketService } = useServices()
  const history = useHistory()
  const url = '/auth/sign-in'
  const mutateFn = async (args: LoginArgs) => {
    return await apiService.post<User>(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: response => {
      const user = response.data

      storageService.set<User>('user', user)
      storageService.set('visitedUrl', [])

      if (hasRole(user.roles, AppRole.ACCREDITED)) {
        socketService.subscribeToSocket(user.accessToken)
      }

      history.push('/app')
    }
  })
}
