export interface UseAddTokenByDetailsToMetamaskArgs {
  address: string
  symbol?: string
  decimals?: number
  image?: string
  onSuccess: (success: boolean) => void
}
export default function useAddToMetamask() {
  return (args: UseAddTokenByDetailsToMetamaskArgs) => {
    const { onSuccess, address, ...rest } = args
    if (window && window?.ethereum?.isMetaMask && window?.ethereum?.request && address) {
      window?.ethereum
        ?.request({
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
  }
}
