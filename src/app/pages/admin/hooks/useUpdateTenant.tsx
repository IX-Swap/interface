import { useServices } from 'hooks/useServices'
import { TenantFormValues } from 'types/tenants'
import { useMutation, useQueryCache } from 'react-query'
import { tenantsQueryKeys } from 'config/queryKeys'
import { tenantsURL } from 'config/apiURL'

export const useUpdateTenant = (tenantId: string) => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()

  const url = tenantsURL.updateTenant(tenantId)
  const updateTenant = async (args: Partial<TenantFormValues>) => {
    return await apiService.put<TenantFormValues>(url, args)
  }

  return useMutation(updateTenant, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries(
        tenantsQueryKeys.getTenantById + tenantId
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
