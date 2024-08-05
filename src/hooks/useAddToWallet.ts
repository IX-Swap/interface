import { useAccount, useWalletClient } from 'wagmi'
import { watchAsset } from 'viem/actions'
import { Address } from 'viem'

import { canRegisterToken } from 'utils/wallet'

export interface UseAddTokenByDetailsToWalletArgs {
  address: string
  symbol: string
  decimals: number
  image?: string
}
export default function useAddTokenToWallet() {
  const { connector, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const isCanRegisterToken = canRegisterToken()

  async function addTokenToWallet(args: UseAddTokenByDetailsToWalletArgs) {
    if (!walletClient) return false;
    if (connector && connector.name === 'Binance') return false;
    if (!(connector && isConnected)) return false;
    if (!isCanRegisterToken) return false;

    const { address, symbol, decimals, image } = args

    const success = await watchAsset(walletClient, {
      type: 'ERC20',
      options: {
        address: address as Address,
        symbol,
        image,
        decimals,
      },
    })

    return success
  }

  return { addTokenToWallet }
}
