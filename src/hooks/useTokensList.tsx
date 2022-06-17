import React, { useMemo } from 'react'

import { useSecTokenState } from 'state/secTokens/hooks'
import { useSimpleTokens } from 'hooks/Tokens'
import { useNativeCurrency } from 'hooks/useNativeCurrency'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'

export const useTokensList = () => {
  const { tokens: secTokens } = useSecTokenState()
  const tokens = useSimpleTokens()
  const native = useNativeCurrency()

  const tokensOptions = useMemo(() => {
    if (Object.values(tokens)?.length) {
      const list: any = Object.values(tokens).map((token: any) => {
        return {
          label: token.tokenInfo?.symbol || token.symbol,
          value: token.address,
          icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
        }
      })

      if (native) {
        list.unshift({
          label: native.symbol,
          value: native.symbol,
          icon: <CurrencyLogo currency={native} />,
          address: native.wrapped.address,
          isNative: true,
        })
      }
      return list
    }

    return []
  }, [tokens, native])

  const secTokensOptions = useMemo(() => {
    if (secTokens?.length) {
      return secTokens.map((token) => ({
        label: token.symbol,
        value: token.id,
        icon: <CurrencyLogo currency={new WrappedTokenInfo(token)} />,
      }))
    }

    return []
  }, [secTokens])

  return { tokensOptions, secTokensOptions }
}
