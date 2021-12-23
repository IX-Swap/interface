import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import {
  WithdrawalAddress,
  MakeWithdrawalAddressArgs
} from 'types/withdrawalAddress'
import { useMutation, useQueryCache } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { accountsURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { withdrawalAddressQueryKeys } from 'config/queryKeys'

export const useMakeWithdrawalAddress = () => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useHistory()
  const { user } = useAuth()
  const queryCache = useQueryCache()
  const uri = accountsURL.withdrawalAddresses.create(getIdFromObj(user))
  const mutateFn = async (args: MakeWithdrawalAddressArgs) => {
    return await apiService.post<WithdrawalAddress>(uri, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
      replace(WithdrawalAddressesRoute.list)
      void queryCache.invalidateQueries(
        withdrawalAddressQueryKeys.getByUserId(getIdFromObj(user))
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
