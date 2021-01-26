import { useState } from 'react'
import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { authURL } from 'config/apiURL'
import { useAdminRouter } from 'app/pages/admin/router'
import { usersQueryKeys } from 'config/queryKeys'

export const useReset2FA = (succesHandler: () => void) => {
  const { apiService, snackbarService } = useServices()
  const { params } = useAdminRouter()
  const [otp, setOtp] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const queryCache = useQueryCache()

  const url = authURL.reset2fa(params.userId)
  const mutateFn = async () => {
    return await apiService.post(url, { otp: otp })
  }

  return {
    mutation: useMutation(mutateFn, {
      onSuccess: async () => {
        snackbarService.showSnackbar('2FA reset has been successful', 'success')
        await queryCache.invalidateQueries(
          usersQueryKeys.getUserById(params.userId)
        )
        succesHandler()
      },
      onError: (error: any) => {
        setErrorMessage(error.message)
      }
    }),
    otp,
    setOtp,
    errorMessage
  }
}
