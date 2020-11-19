import { useServices } from 'v2/hooks/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { MakeWithdrawalAddressArgs } from 'v2/types/withdrawalAddress'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'v2/helpers/strings'
import { useWithdrawalAddressesRouter } from 'v2/app/pages/accounts/pages/withdrawalAddresses/router'

export const useWithdrawalAddress = () => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useWithdrawalAddressesRouter()
  const { user } = useAuth()
  const uri = `/accounts/withdrawal-addresses/${getIdFromObj(user)}`
  const mutateFn = async (args: MakeWithdrawalAddressArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(mutateFn, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
      replace('view', { withdrawalAddressId: data?.data?.id })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
