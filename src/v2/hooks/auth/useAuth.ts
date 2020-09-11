import { queryCache } from 'react-query'
import User from 'v2/types/user'
import { USER_QUERY_KEY } from 'v2/auth/hooks/useUser'
import { useServices } from 'v2/services/useServices'

export const useAuth = () => {
  const { storageService } = useServices()
  const cachedUser = queryCache.getQueryData<User>(USER_QUERY_KEY)
  const localUser = storageService.get<User>('user')
  const user = cachedUser ?? localUser

  return {
    isAuthenticated: user !== undefined,
    user
  }
}
