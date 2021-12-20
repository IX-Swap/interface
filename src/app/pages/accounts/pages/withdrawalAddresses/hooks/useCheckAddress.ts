import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { blockchainNetworksURL } from 'config/apiURL'
import { BlockchainWallet } from 'config/blockchain'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { BlockchainNetworks } from 'types/blockchain'

interface CheckAddressResponse {
  allowConnect: boolean
  networkId: string
  networkName: string
  walletApplication: BlockchainWallet
  code: BlockchainNetworks
}

export const useCheckAddress = (
  callbacks: QueryOrMutationCallbacks<CheckAddressResponse>
) => {
  const { apiService, snackbarService } = useServices()
  const uri = blockchainNetworksURL.checkAddress

  const generateWalletHash = async (walletAddress: string) => {
    return await apiService.post<CheckAddressResponse>(uri, { walletAddress })
  }

  return useMutation(generateWalletHash, {
    onSuccess: callbacks?.onSuccess,
    onError: error => {
      snackbarService.showSnackbar((error as any).message, 'error')
    }
  })
}
