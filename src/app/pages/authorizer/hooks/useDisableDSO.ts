import { issuanceURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { DigitalSecurityOffering } from 'types/dso'

export const useDisableDSO = (isCreate: boolean, dsoId: string) => {
  const { apiService, snackbarService } = useServices()

  const disableDSO = async (isDisabled: boolean) => {
    return await apiService.patch<DigitalSecurityOffering>(
      issuanceURL.dso.disable(dsoId),
      {
        isDisabled
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
