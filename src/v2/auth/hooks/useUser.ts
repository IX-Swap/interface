import User from 'v2/types/user'
import { useMutation } from 'react-query'
import apiService from 'v2/services/api'
import { getIdFromObj } from 'v2/helpers/strings'
import { useCachedUser } from 'v2/hooks/auth/useCachedUser'

export const USER_QUERY_KEY = 'user'

export const useUser = () => {
  const savedUser = useCachedUser()
  const url = `/auth/profiles/${getIdFromObj(savedUser)}`
  const mutateFn = async () => await apiService.get<User>(url)

  return useMutation(mutateFn)
}
