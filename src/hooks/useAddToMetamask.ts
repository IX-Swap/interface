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
  const { library, chainId } = useActiveWeb3React()

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
          .then((success) => {
            onSuccess(success)
          })
          .catch(() => onSuccess(false))
      } else {
        onSuccess(false)
      }
    },
    [library, chainId]
  )
}
