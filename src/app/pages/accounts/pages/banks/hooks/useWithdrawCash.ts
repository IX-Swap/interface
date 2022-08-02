import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { WithdrawCashParams } from 'app/pages/accounts/types'
import { accountsURL } from 'config/apiURL'
import {
  cashWithdrawalsQueryKeys,
  virtualAccountQueryKeys
} from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useWithdrawCash = () => {
  const { user } = useAuth()
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const { list: virtualAccountsList } = useVirtualAccount()

  const withdrawCash = async (args: WithdrawCashParams) => {
    const virtualAccount = virtualAccountsList.find(
      (item: any) => item.accountNumber === args.virtualAccount
    )
    const virtualAccountId = getIdFromObj(virtualAccount)
    const uri = accountsURL.virtualAccounts.withdraw(
      getIdFromObj(user),
      virtualAccountId
    )
    return await apiService.post(uri, {
      ...args,
      virtualAccount: undefined
    })
  }

  return useMutation(withdrawCash, {
    onSuccess: () => {
      snackbarService.showSnackbar(
        'Withdrawal sent to authorizer, wait for approval',
        'success'
      )
      void queryCache.invalidateQueries(
        cashWithdrawalsQueryKeys.getByUserId(getIdFromObj(user))
      )
      void queryCache.invalidateQueries([
        virtualAccountQueryKeys.getByUserId,
        { userId: getIdFromObj(user) }
      ])
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
