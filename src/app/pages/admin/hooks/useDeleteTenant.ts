import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'
import { DataroomFile } from 'types/dataroomFile'
import { tenantsURL } from 'config/apiURL'
import { tenantsQueryKeys } from 'config/queryKeys'

export const useDeleteTenant = (
  tenantId: string,
  succesHandler: () => void
) => {
  const { snackbarService, apiService } = useServices()
  const url = tenantsURL.deleteTenant(tenantId)
  const queryCache = useQueryCache()

  const deleteTenant = async () => {
    return await apiService.delete<DataroomFile>(url, {})
  }

  return useMutation(deleteTenant, {
    onSuccess: async () => {
      void snackbarService.showSnackbar('Success', 'success')
      await queryCache.invalidateQueries(tenantsQueryKeys.getTenantsList)
      succesHandler()
    },
    onError: () => snackbarService.showSnackbar('Error', 'error')
  })
}
