import { accountsURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { banksQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'

export const useRemoveBank = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const { user } = useAuth()

  const userId = getIdFromObj(user)

  const removeBank = async ({
    bankId,
    otp
  }: {
    bankId: string
    otp: string
  }) => {
    const url = accountsURL.banks.remove(userId, bankId)
    return await apiService.put(url, { otp })
  }

  return useMutation(removeBank, {
    onSuccess: data => {
      void queryCache.invalidateQueries(banksQueryKeys.getListByUserId(userId))
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
