import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import {
  WithdrawalAddress,
  MakeWithdrawalAddressArgs
} from 'types/withdrawalAddress'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { useWithdrawalAddressesRouter } from 'app/pages/accounts/pages/withdrawalAddresses/router'
import { accountsURL } from 'config/apiURL'

export const useMakeWithdrawalAddress = () => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useWithdrawalAddressesRouter()
  const { user } = useAuth()
  const uri = accountsURL.withdrawalAddresses.create(getIdFromObj(user))
  const mutateFn = async (args: MakeWithdrawalAddressArgs) => {
    return await apiService.post<WithdrawalAddress>(uri, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
      replace('list')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
