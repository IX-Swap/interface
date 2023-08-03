import { issuanceURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { DigitalSecurityOffering } from 'types/dso'

export const useNonInvestable = (dsoId: string) => {
  const { apiService, snackbarService } = useServices()

  const nonInvestableDSO = async (investable: boolean) => {
    return await apiService.post<DigitalSecurityOffering>(
      issuanceURL.dso.disable(dsoId),
      {
        investable
      }
    )
  }

  return useMutation(nonInvestableDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
