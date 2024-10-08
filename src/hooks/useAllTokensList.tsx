import React, { useMemo } from 'react'

import { useAllSecTokens } from 'state/secTokens/hooks'
import { useSimpleTokens } from 'hooks/Tokens'
import { useNativeCurrency } from 'hooks/useNativeCurrency'
import CurrencyLogo from 'components/CurrencyLogo'
import { WrappedTokenInfo } from 'state/lists/wrappedTokenInfo'

export interface Option {
  label: string
  value: string | number
  icon?: JSX.Element
  address?: string
  isNative?: boolean
}

export const useAllTokensList = () => {
  const { secTokens } = useAllSecTokens()
  const tokens = useSimpleTokens()
  const native = useNativeCurrency()

  const sortedTokens = Object.entries(tokens || {}).reduce((acc, [key, value]) => {
    if (secTokens[key]) {
      return acc
    }

    return { ...acc, [key]: value }
  }, {})

  const tokensOptions = useMemo((): Option[] => {
    if (Object.values(sortedTokens)?.length) {
      const list: any = Object.values(sortedTokens).map((token: any) => {
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
  }, [sortedTokens, native])

  const secTokensOptions = useMemo((): Option[] => {
    if (secTokens) {
      return Object.values(secTokens).map((token) => ({
        label: token.symbol,
        value: (token.tokenInfo as any).id,
        icon: <CurrencyLogo currency={new WrappedTokenInfo(token.tokenInfo)} />,
        isNative: false,
        address: token.address,
      }))
    }

    return []
  }, [secTokens])

  return { tokensOptions, secTokensOptions }
}
