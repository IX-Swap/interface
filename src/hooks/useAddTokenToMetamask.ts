import { getTokenLogoURL } from './../components/CurrencyLogo/index'
import { Currency, Token } from '@ixswap1/sdk-core'
import { useCallback, useEffect, useState } from 'react'
import { useActiveWeb3React } from 'hooks/web3'
import { useSecTokens } from 'state/secTokens/hooks'
import useAddToMetamask from './useAddToMetamask'

export default function useAddTokenToMetamask(currencyToAdd: Currency | undefined): {
  addToken: () => void
  success: boolean | undefined
} {
  const { chainId } = useActiveWeb3React()
  const token: Token | undefined = currencyToAdd?.wrapped
  const { secTokens } = useSecTokens()

  const [success, setSuccess] = useState<boolean | undefined>()
  useEffect(() => {
    setSuccess(false)
  }, [currencyToAdd])
  const addToMetamask = useAddToMetamask()
  const addToken = useCallback(() => {
    if (token) {
      let wrappedSymbol
      if (secTokens[token?.address]) {
        wrappedSymbol = `${token?.symbol}`
      }
      addToMetamask({
        address: token.address,
        symbol: wrappedSymbol ?? token.symbol ?? '',
        decimals: token.decimals,
        image: getTokenLogoURL(token.address, chainId),
        onSuccess: setSuccess,
      })
    }
  }, [addToMetamask, token, secTokens, chainId])

  return { addToken, success }
}
