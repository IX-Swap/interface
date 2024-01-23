import { blockchainNetworksURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export interface VerifyWalletOwnershipArgs {
  walletAddress: string
  signedHash: string
}

interface VerifyWalletOwnershipResponse {
  isVerified: boolean
  user: object
}

export const useVerifyWalletOwnershipWeb3Modal = () => {
  const { apiService, snackbarService } = useServices()
  const uri = `${process.env.REACT_APP_API_URL_IXSP as string}${
    blockchainNetworksURL.verifyWalletOwnershipWeb3Modal
  }`

  const generateWalletHash = async (args: VerifyWalletOwnershipArgs) => {
    return await apiService.post<VerifyWalletOwnershipResponse>(uri, args)
  }

  return useMutation(generateWalletHash, {
    onError: () => {
      snackbarService.showSnackbar('Failed to verify the wallet', 'error')
    }
  })
}
