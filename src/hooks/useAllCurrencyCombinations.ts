import { Currency, Token } from '@ixswap1/sdk-core'
import flatMap from 'lodash.flatmap'
import { useMemo } from 'react'
import { ADDITIONAL_BASES, BASES_TO_CHECK_TRADES_AGAINST, CUSTOM_BASES } from '../constants/routing'

export function useAllCurrencyCombinations(
  currencyA?: Currency,
  currencyB?: Currency,
  tokensToExclude?: string[]
): [Token, Token][] {
  const chainId = currencyA?.chainId

  const [tokenA, tokenB] = chainId ? [currencyA?.wrapped, currencyB?.wrapped] : [undefined, undefined]

  const bases: Token[] = useMemo(() => {
    if (!chainId || chainId !== tokenB?.chainId) return []

    const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? []
    const additionalA = tokenA ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? [] : []
    const additionalB = tokenB ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? [] : []

    const data = [...common, ...additionalA, ...additionalB]
    if (tokensToExclude?.length) {
      return data.filter((token) => !tokensToExclude.includes(token.address))
    }
    return data
  }, [chainId, tokenA, tokenB, tokensToExclude])

  const basePairs: [Token, Token][] = useMemo(
    () => flatMap(bases, (base): [Token, Token][] => bases.map((otherBase) => [base, otherBase])),
    [bases]
  )

  return useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
            .filter(([tokenA, tokenB]) => {
              if (!chainId) return true
              const customBases = CUSTOM_BASES[chainId]

              const customBasesA: Token[] | undefined = customBases?.[tokenA.address]
              const customBasesB: Token[] | undefined = customBases?.[tokenB.address]

              if (!customBasesA && !customBasesB) return true

              if (customBasesA && !customBasesA.find((base) => tokenB.equals(base))) return false
              if (customBasesB && !customBasesB.find((base) => tokenA.equals(base))) return false

              return true
            })
        : [],
    [tokenA, tokenB, bases, basePairs, chainId]
  )
}
