import { useMutation, useQueryCache } from 'react-query'
import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { WithdrawCashArgs } from 'app/pages/accounts/types'
import { getIdFromObj } from 'helpers/strings'
import { accountsURL } from 'config/apiURL'
import {
  cashWithdrawalsQueryKeys,
  virtualAccountQueryKeys
} from 'config/queryKeys'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'

export const useWithdrawCash = () => {
  const { user } = useAuth()
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const { list: virtualAccountsList } = useVirtualAccount()

  const withdrawCash = async (args: WithdrawCashArgs) => {
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
    onSuccess: data => {
      void snackbarService.showSnackbar(
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
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
