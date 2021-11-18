import { blockchainNetworksURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

interface VerifyWalletOwnershipArgs {
  walletAddress: string
  signedHash: string
}

interface VerifyWalletOwnershipResponse {
  isVerified: boolean
}

export const useVerifyWalletOwnership = () => {
  const { apiService, snackbarService } = useServices()
  const uri = blockchainNetworksURL.verifyWalletOwnership

  const generateWalletHash = async (args: VerifyWalletOwnershipArgs) => {
    return await apiService.post<VerifyWalletOwnershipResponse>(uri, args)
  }

  return useMutation(generateWalletHash, {
    onError: () => {
      snackbarService.showSnackbar('Failed to verify sign the wallet', 'error')
    }
  })
}
