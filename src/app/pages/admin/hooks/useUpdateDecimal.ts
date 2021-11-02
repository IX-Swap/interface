import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useAuth } from '../../../../hooks/auth/useAuth'
import { getIdFromObj } from '../../../../helpers/strings'

export const useUpdateDecimal = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const updateDecimal = async ({
    decimal,
    network
  }: {
    decimal: number
    network: string
  }) => {
    return await apiService.put(
      `/blockchain/settings/decimal/${network}/${decimal}`,
      {
        userId,
        otp: ''
      }
    )
  }

  return useMutation(updateDecimal, {
    onSuccess: () => {
      snackbarService.showSnackbar('Updated', 'success')
    },
    onError: () => {
      snackbarService.showSnackbar(
        "Couldn't update decimal at this time",
        'error'
      )
    }
  })
}
