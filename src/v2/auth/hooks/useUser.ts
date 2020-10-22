import User from 'v2/types/user'
import { useMutation } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import apiService from 'v2/services/api'
import { getIdFromObj } from 'v2/helpers/strings'

export const USER_QUERY_KEY = 'user'

export const useUser = () => {
  const { user: savedUser } = useAuth()
  const url = `/auth/profiles/${getIdFromObj(savedUser)}`
  const mutateFn = async () => await apiService.get<User>(url)

  return useMutation(mutateFn)
}
