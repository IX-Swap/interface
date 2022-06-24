import { useCallback, useEffect, useState } from 'react'
import { DeploymentInfo } from 'types/dso'
import { isMetamaskOrWalletConnect, useActiveWeb3React } from './web3'

interface AddTokenToMetamaskArgs {
  token: DeploymentInfo | undefined | null
}
export const useAddTokenToMetamask = ({
  token
}: AddTokenToMetamaskArgs): {
  addToken: () => Promise<void>
  success: boolean | undefined
} => {
  const { library } = useActiveWeb3React()
  const [success, setSuccess] = useState<boolean | undefined>()
  useEffect(() => {
    setSuccess(false)
  }, [token])

  const addToken = useCallback(async () => {
    if (
      isMetamaskOrWalletConnect(library) &&
      library?.provider?.request != null &&
      token !== null &&
      token !== undefined
    ) {
      library.provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            // @ts-expect-error // need this for incorrect ethers provider type
            type: 'ERC20',
            options: {
              address: token.token,
              symbol: token.symbol,
              decimals: token.decimals
            }
          }
        })
        .then(success => {
          setSuccess(success)
        })
        .catch(() => setSuccess(false))
    } else {
      setSuccess(false)
    }
  }, [library, token])

  return { addToken, success }
}
