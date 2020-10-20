import { useMutation } from 'react-query'
import { SignupArgs } from 'v2/types/auth'
import apiService from 'v2/services/api'

export const useSignup = () => {
  const url = '/auth/registrations'
  const mutateFn = async (args: SignupArgs) => {
    return await apiService.post(url, args)
  }

  return useMutation(mutateFn)
}
