import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { blockchainNetworksURL } from 'config/apiURL'

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
      blockchainNetworksURL.getUpdateDecimal(network, decimal),
      {
        userId,
        otp: '' // TODO fix otp
      }
    )
  }

  return useMutation(updateDecimal, {
    onSuccess: () => {
      snackbarService.showSnackbar('Successfully updated decimal', 'success')
    },
    onError: () => {
      snackbarService.showSnackbar(
        "Couldn't update decimal at this time",
        'error'
      )
    }
  })
}
