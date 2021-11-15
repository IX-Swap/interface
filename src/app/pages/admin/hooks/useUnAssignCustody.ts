import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import apiService from 'services/api'
import { custodyAccounts } from 'config/apiURL'
import { CloseDealArgs } from 'types/dso'

interface UnAssignCustodyArgs extends CloseDealArgs {
  accountId: string
}

export const useUnAssignCustody = () => {
  const { snackbarService } = useServices()
  const url = custodyAccounts.unAssignCustody
  const mutateFn = async (args: UnAssignCustodyArgs) => {
    return await apiService.post(url, args)
  }

  return {
    mutation: useMutation(mutateFn, {
      onSuccess: response => {
        snackbarService.showSnackbar(
          'Custody unlinked successfully.',
          'success'
        )
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
