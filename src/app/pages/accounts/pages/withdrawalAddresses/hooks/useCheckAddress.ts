import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { blockchainNetworksURL } from 'config/apiURL'
import { BlockchainWallet } from 'config/blockchain'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { BlockchainNetworks } from 'types/blockchain'

interface CheckAddressPayload {
  walletAddress: string
  chainId: number
}

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

  const checkAddress = async ({
    walletAddress,
    chainId
  }: CheckAddressPayload) => {
    return await apiService.post<CheckAddressResponse>(uri, {
      walletAddress,
      chainId
    })
  }

  return useMutation(checkAddress, {
    onSuccess: callbacks?.onSuccess,
    onError: error => {
      snackbarService.showSnackbar((error as any).message, 'error')
    }
  })
}
