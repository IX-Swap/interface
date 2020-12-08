import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { DigitalSecurityOffering } from 'types/dso'
import { issuanceURL } from 'config/apiURL'

export const useToggleDSOFavorite = (dso: DigitalSecurityOffering) => {
  const { apiService, snackbarService } = useServices()
  const uri = issuanceURL.dso.favorite(getIdFromObj(dso))

  const mutateFn = async (isFav: boolean) => {
    if (isFav) {
      return await apiService.delete(uri, {})
    } else {
      return await apiService.post(uri, {})
    }
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
