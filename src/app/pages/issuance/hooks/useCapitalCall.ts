import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import apiService from 'services/api'
import { issuanceURL } from 'config/apiURL'
import { useParams } from 'react-router-dom'

export const useCapitalCall = () => {
  const { snackbarService } = useServices()
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const url = issuanceURL.dso.capitalCall(issuerId, dsoId)
  const mutateFn = async (emails: string[]) => {
    return await apiService.post<{ emails: string[] }>(url, { emails })
  }

  return {
    mutation: useMutation(mutateFn, {
      onSuccess: response => {
        void snackbarService.showSnackbar(
          'Email has been sent to investors',
          'success'
        )
      },
      onError: () => {
        void snackbarService.showSnackbar(
          'There was an error sending an email. Please try again in few minutes.',
          'error'
        )
      }
    })
  }
}
