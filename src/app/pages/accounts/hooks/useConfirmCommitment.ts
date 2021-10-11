import { accountsURL } from 'config/apiURL'
import { investQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useConfirmCommitment = (callback?: () => void) => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const queryCache = useQueryCache()

  const confirmCommitment = async (args: {
    commitmentId: string
    otp: string
  }) => {
    const commitmentId = args.commitmentId
    const url = accountsURL.commitments.confirmCommitment(commitmentId)
    return await apiService.put(url, { otp: args.otp })
  }

  return useMutation(confirmCommitment, {
    onSuccess: () => {
      callback?.()
      void queryCache.invalidateQueries(
        investQueryKeys.getCommitmentsByUserId(userId)
      )
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      callback?.()
      void snackbarService.showSnackbar(
        error.message ?? 'Something went wrong',
        'error'
      )
    }
  })
}
