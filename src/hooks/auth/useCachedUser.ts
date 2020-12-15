import { useServices } from 'hooks/useServices'
import { queryCache } from 'react-query'
import User from 'types/user'
import { USER_QUERY_KEY } from 'auth/hooks/useUser'

export const useCachedUser = () => {
  const { storageService } = useServices()
  const cachedUser = queryCache.getQueryData<User>(USER_QUERY_KEY)
  const localUser = storageService.get<User>('user')

  return cachedUser ?? localUser
}
