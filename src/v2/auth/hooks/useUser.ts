import User from 'v2/types/user'
import { useMutation } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import apiService from 'v2/services/api'

export const USER_QUERY_KEY = 'user'

export const useUser = () => {
  const { user: savedUser } = useAuth()
  const url = `/auth/profiles/${savedUser?._id ?? ''}`
  const mutateFn = async () => await apiService.get<User>(url)

  return useMutation(mutateFn)
}
