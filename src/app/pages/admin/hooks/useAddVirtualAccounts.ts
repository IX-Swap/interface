import { AddVirtualAccountsFormValues } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsForm'
import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useAddVirtualAccount = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()

  const addVirtualAccount = async (values: AddVirtualAccountsFormValues) => {
    const url = virtualAccounts.add
    return await apiService.post(url, { ...values })
  }

  return useMutation(addVirtualAccount, {
    onSuccess: async () => {
      snackbarService.showSnackbar(
        'Virtual Accounts added successfully!',
        'success'
      )
      await queryCache.invalidateQueries(virtualAccountQueryKeys.listUnassigned)
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
