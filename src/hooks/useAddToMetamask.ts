import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'

export interface UseAddTokenByDetailsToMetamaskArgs {
  address: string
  symbol?: string
  decimals?: number
  image?: string
  onSuccess: (success: boolean) => void
}
export default function useAddToMetamask() {
  const { provider: library, chainId } = useWeb3React()

  return useCallback(
    (args: UseAddTokenByDetailsToMetamaskArgs) => {
      const { onSuccess, address, ...rest } = args
      if (library && library.provider.isMetaMask && library.provider.request && address) {
        library.provider
          .request({
            method: 'wallet_watchAsset',
            params: {
              //@ts-ignore // need this for incorrect ethers provider type
              type: 'ERC20',
              options: {
                address,
                ...rest,
              },
            },
          })
          .then((success: any) => {
            onSuccess(success)
          })
          .catch((err) => {
            console.error('Failed to add token to metamask', err)
            onSuccess(false)
          })
      } else {
        onSuccess(false)
      }
    },
    [library, chainId]
  )
}
