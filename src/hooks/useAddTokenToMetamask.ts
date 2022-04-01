import { getTokenLogoURL } from './../components/CurrencyLogo/index'
import { Currency, Token } from '@ixswap1/sdk-core'
import { useCallback, useEffect, useState } from 'react'
import { useActiveWeb3React } from 'hooks/web3'
import { useSecTokens } from 'state/secTokens/hooks'

export default function useAddTokenToMetamask(currencyToAdd: Currency | undefined): {
  addToken: () => void
  success: boolean | undefined
} {
  const { library, chainId } = useActiveWeb3React()
  const token: Token | undefined = currencyToAdd?.wrapped
  const { secTokens } = useSecTokens()

  const [success, setSuccess] = useState<boolean | undefined>()
  useEffect(() => {
    setSuccess(false)
  }, [currencyToAdd])

  const addToken = useCallback(() => {
    if (library && library.provider.isMetaMask && library.provider.request && token) {
      let wrappedSymbol
      if (secTokens[token?.address]) {
        wrappedSymbol = `${token?.symbol}`
      }
      library.provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            //@ts-ignore // need this for incorrect ethers provider type
            type: 'ERC20',
            options: {
              address: token.address,
              symbol: wrappedSymbol || token.symbol,
              decimals: token.decimals,
              image: getTokenLogoURL(token.address, chainId),
            },
          },
        })
        .then((success) => {
          setSuccess(success)
        })
        .catch(() => setSuccess(false))
    } else {
      setSuccess(false)
    }
  }, [library, token, secTokens, chainId])

  return { addToken, success }
}
