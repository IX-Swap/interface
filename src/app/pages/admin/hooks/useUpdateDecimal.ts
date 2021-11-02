import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { blockchainNetworksURL } from 'config/apiURL'

export interface UpdateDecimalArgs {
  decimal: number
  network: string
  otp: string
}

export const useUpdateDecimal = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)

  const updateDecimal = async ({
    decimal,
    network,
    otp
  }: UpdateDecimalArgs) => {
    return await apiService.put(
      blockchainNetworksURL.getUpdateDecimal(network, decimal),
      { userId, otp }
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
