import { useServices } from 'hooks/useServices'
import { useMutation, queryCache } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { DigitalSecurityOffering } from 'types/dso'
import { issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'

export const useToggleDSOFavorite = (dso: DigitalSecurityOffering) => {
  const { apiService, snackbarService } = useServices()
  const uri = issuanceURL.dso.favorite(getIdFromObj(dso))

  const mutateFn = async (isFav: boolean) => {
    if (isFav) {
      return await apiService.delete(uri, {})
    } else {
      return await apiService.put(uri, {})
    }
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      void queryCache.invalidateQueries(dsoQueryKeys.getList)
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
