import User from 'v2/types/user'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'v2/helpers/strings'
import { useCachedUser } from 'v2/hooks/auth/useCachedUser'
import { useServices } from 'v2/hooks/useServices'

export const USER_QUERY_KEY = 'user'

export const useUser = () => {
  const savedUser = useCachedUser()
  const { apiService, storageService } = useServices()
  const url = `/auth/profiles/${getIdFromObj(savedUser)}`
  const mutateFn = async () => await apiService.get<User>(url)

  return useMutation(mutateFn, {
    onSuccess: data => {
      storageService.set('user', data.data)
      storageService.set('visitedUrl', [])
    }
  })
}
