import { issuanceURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { DigitalSecurityOffering } from 'types/dso'

export const usePromoteDSO = (dsoId: string) => {
  const { apiService, snackbarService } = useServices()

  const promoteDSO = async (promoted: boolean) => {
    return await apiService.post<DigitalSecurityOffering>(
      issuanceURL.dso.promote(dsoId),
      {
        promoted
      }
    )
  }

  return useMutation(promoteDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
