import { issuanceURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { DigitalSecurityOffering } from 'types/dso'

export const useDisableDSO = (dsoId: string) => {
  const { apiService, snackbarService } = useServices()

  const disableDSO = async (disabled: boolean) => {
    return await apiService.post<DigitalSecurityOffering>(
      issuanceURL.dso.disable(dsoId),
      {
        disabled
      }
    )
  }

  return useMutation(disableDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
