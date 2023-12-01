import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { tenantsURL } from 'config/apiURL'
import { generatePath, useHistory } from 'react-router-dom'
import { AdminRoute } from 'app/pages/admin/router/config'
import { TenantFormValues } from 'types/tenants'

export const useCreateTenant = () => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useHistory()
  const url = tenantsURL.createTenant

  const createTenant = async (args: TenantFormValues) => {
    delete args.status
    return await apiService.post(url, args)
  }

  return useMutation(createTenant, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
      replace(
        generatePath(AdminRoute.viewClientSpace, {
          tenantId: data.data._id
        })
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
