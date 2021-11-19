import { blockchainNetworksURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export interface GenerateWalletHashArgs {
  walletAddress: string
}

export const useGenerateWalletHash = () => {
  const { apiService } = useServices()
  const uri = blockchainNetworksURL.generateWalletHash

  const generateWalletHash = async (args: GenerateWalletHashArgs) => {
    return await apiService.post<string>(uri, args)
  }

  return useMutation(generateWalletHash)
}
