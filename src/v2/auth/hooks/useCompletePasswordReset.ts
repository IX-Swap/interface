import { useMutation } from 'react-query'
import { useAuthRouter } from 'v2/auth/router'
import apiService from 'v2/services/api'
import { CompletePasswordResetArgs } from 'v2/types/auth'

export const useCompletePasswordReset = () => {
  const { push } = useAuthRouter()
  const url = '/password/reset/confirm'
  const mutateFn = async (args: CompletePasswordResetArgs) => {
    return await apiService.post(url, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => push('login'),
    onError: error => alert(error)
  })
}
