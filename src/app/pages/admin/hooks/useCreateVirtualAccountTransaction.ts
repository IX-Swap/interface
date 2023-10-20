import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { virtualAccounts } from 'config/apiURL'
import { virtualTransactionsQueryKeys } from 'config/queryKeys'
import { AdminRoute } from 'app/pages/admin/router/config'
import { useHistory } from 'react-router-dom'
import { VirtualAccountTransactionFormValues } from 'types/virtualAccountTransaction'

export type CreateVirtualAccountTransactionProps = Omit<
  VirtualAccountTransactionFormValues,
  'accountId' | 'email'
>

export const useCreateVirtualAccountTransaction = () => {
  const { replace } = useHistory()
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()
  const url = virtualAccounts.createManualTransaction
  const createTransaction = async (
    args: CreateVirtualAccountTransactionProps
  ) => {
    return await apiService.post(url, args)
  }

  return useMutation(createTransaction, {
    onSuccess: () => {
      replace(AdminRoute.virtualAccountTransactions)
      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries(
        virtualTransactionsQueryKeys.getTransactions
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
