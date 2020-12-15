import User from 'types/user'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { useCachedUser } from 'hooks/auth/useCachedUser'
import { useServices } from 'hooks/useServices'
import { userURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'

export const USER_QUERY_KEY = 'user'

export const useUser = () => {
  const savedUser = useCachedUser()
  const { apiService, storageService } = useServices()
  const url = userURL.getUserProfile(getIdFromObj(savedUser))
  const mutateFn = async () => await apiService.get<User>(url)
  const history = useHistory()

  return useMutation(mutateFn, {
    onSuccess: data => {
      storageService.set('user', data.data)
      storageService.set('visitedUrl', [])
    },
    onError: () => {
      storageService.remove('user')
      storageService.remove('visitedUrl')
      storageService.remove('access-token')
      history.replace('/')
    }
  })
}
