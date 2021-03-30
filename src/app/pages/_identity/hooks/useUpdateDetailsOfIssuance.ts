import { identityURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export const useUpdateDetailsOfIssuance = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const updateDetailsOfIssuance = async (values: any) => {
    const uri = identityURL.detailsOfIssuance.update(userId, 'issuance-id')
    return await apiService.put(uri, values)
  }

  return useMutation(updateDetailsOfIssuance, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
