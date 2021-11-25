import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import apiService from 'services/api'
import { custodyAccounts } from 'config/apiURL'
import { CloseDealArgs } from 'types/dso'
import { custodyAccountsQueryKeys } from 'config/queryKeys'

interface UnAssignCustodyArgs extends CloseDealArgs {
  accountId: number
  otp: string
}

export const useUnAssignCustody = () => {
  const queryCache = useQueryCache()
  const { snackbarService } = useServices()
  const url = custodyAccounts.unAssignCustody
  const mutateFn = async (args: UnAssignCustodyArgs) => {
    return await apiService.post(url, args)
  }

  return {
    mutation: useMutation(mutateFn, {
      onSuccess: () => {
        snackbarService.showSnackbar(
          'Custody unlinked successfully.',
          'success'
        )
        void queryCache.invalidateQueries(custodyAccountsQueryKeys.getList)
      },
      onError: (error: any) => {
        snackbarService.showSnackbar(
          error.message ??
            'There was an error unlinking the custody. Please try again in few minutes.',
          'error'
        )
      }
    })
  }
}
