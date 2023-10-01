import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'

export interface UseAddTokenByDetailsToMetamaskArgs {
  address: string
  symbol?: string
  decimals?: number
  image?: string
  onSuccess: (success: boolean) => void
}
export default function useAddToMetamask() {
  const { provider, chainId } = useActiveWeb3React()

  return useCallback(
    (args: UseAddTokenByDetailsToMetamaskArgs) => {
      const { onSuccess, address, ...rest } = args
      const type = 'ERC20'
      const options = {
        address,
        ...rest,
      }
      if (provider?.isMetaMask && provider?.send && address) {
        provider
          .send(
            'wallet_watchAsset',
            [type, options],
          )
          .then((success: any) => {
            onSuccess(success)
          })
          .catch(() => onSuccess(false))
      } else {
        onSuccess(false)
      }
    },
    [provider, chainId]
  )
}
