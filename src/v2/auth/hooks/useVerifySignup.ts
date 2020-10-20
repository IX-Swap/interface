import { useMutation } from 'react-query'
import { VerifySignupArgs } from 'v2/types/auth'
import apiService from 'v2/services/api'

export const useVerifySignup = () => {
  const url = '/auth/registrations/confirm'
  const mutateFn = async (args: VerifySignupArgs) => {
    return await apiService.post(url, args)
  }

  return useMutation(mutateFn)
}
