import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { DataroomFile } from 'types/dataroomFile'
import { issuanceURL } from 'config/apiURL'
import { issuanceQueryKeys } from 'config/queryKeys'

export const useRemoveFromWhitelist = (
  address: string,
  assetId: string,
  succesHandler: () => void
) => {
  const { snackbarService, apiService } = useServices()
  const url = issuanceURL.whitelist.removeFromWhitelist
  const queryCache = useQueryCache()

  const deleteTenant = async () => {
    return await apiService.post<DataroomFile>(url, { address, assetId })
  }

  return useMutation(deleteTenant, {
    onSuccess: async () => {
      void snackbarService.showSnackbar('Success', 'success')
      await queryCache.invalidateQueries(
        issuanceQueryKeys.getWhitelistedAddresses
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    },
    onSettled: succesHandler
  })
}
