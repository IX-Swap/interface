import { identityURL } from 'config/apiURL'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export const useCreateDetailsOfIssuance = () => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const createDetailsOfIssuance = async (values: any) => {
    const uri = identityURL.detailsOfIssuance.create(userId)
    return await apiService.post(uri, values)
  }

  return useMutation(createDetailsOfIssuance, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
