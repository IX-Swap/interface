import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import apiService from 'services/api'
import { issuanceURL } from 'config/apiURL'
import { CloseDealArgs } from 'types/dso'

interface CloseDealRequest extends CloseDealArgs {
  dso: string
}

export const useCloseDeal = () => {
  const { snackbarService } = useServices()
  const url = issuanceURL.dso.closeDeal()
  const mutateFn = async (args: CloseDealRequest) => {
    return await apiService.post(url, args)
  }

  return {
    mutation: useMutation(mutateFn, {
      onSuccess: response => {
        snackbarService.showSnackbar('Deal closed successfully', 'success')
      },
      onError: (error: any) => {
        snackbarService.showSnackbar(
          error.message ??
            'There was an error closing the deal. Please try again in few minutes',
          'error'
        )
      }
    })
  }
}
