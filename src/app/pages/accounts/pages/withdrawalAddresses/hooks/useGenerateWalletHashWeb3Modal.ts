import { blockchainNetworksURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

export interface GenerateWalletHashArgs {
  walletAddress: string
}

export const useGenerateWalletHashWeb3Modal = () => {
  const { apiService } = useServices()
  const uri = `${process.env.REACT_APP_API_URL_IXSP as string}${
    blockchainNetworksURL.generateWalletHashWeb3Modal
  }`

  const generateWalletHash = async (args: GenerateWalletHashArgs) => {
    return await apiService.post<string>(uri, args)
  }

  return useMutation(generateWalletHash)
}
