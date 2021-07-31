import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import apiService from 'services/api'
import { issuanceURL } from 'config/apiURL'
import { useParams } from 'react-router-dom'
import { CloseDealArgs } from 'types/dso'

export const useCloseDeal = () => {
  const { snackbarService } = useServices()
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const url = issuanceURL.dso.closeDeal(issuerId, dsoId)
  const mutateFn = async (args: CloseDealArgs) => {
    return await apiService.patch(url, args)
  }

  return {
    mutation: useMutation(mutateFn, {
      onSuccess: response => {
        snackbarService.showSnackbar('Deal closed successfully', 'success')
      },
      onError: (error: any) => {
        snackbarService.showSnackbar(error.message, 'error')
      }
    })
  }
}
