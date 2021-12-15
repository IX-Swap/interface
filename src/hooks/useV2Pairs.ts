import { Pair } from '@ixswap1/v2-sdk'
import { useMemo } from 'react'
import { abi as IIxsV2PairABI } from '@ixswap1/v2-core/build/IIxsV2Pair.json'
import { Interface } from '@ethersproject/abi'
import { useMultipleContractSingleData } from '../state/multicall/hooks'
import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { isSecurityPair, useSecTokens } from 'state/secTokens/hooks'

const PAIR_INTERFACE = new Interface(IIxsV2PairABI)

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

export function useV2Pairs(
  currencies: [Currency | undefined | null, Currency | undefined | null][]
): [PairState, Pair | null][] {
  const tokens = useMemo(
    () => currencies.map(([currencyA, currencyB]) => [currencyA?.wrapped, currencyB?.wrapped]),
    [currencies]
  )

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined
      }),
    [tokens]
  )

  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, 'getReserves')
  const { secTokens } = useSecTokens()

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result
      const tokenA = tokens[i][0]
      const tokenB = tokens[i][1]

      if (loading) return [PairState.LOADING, null]
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null]
      if (!reserves) return [PairState.NOT_EXISTS, null]
      const { reserve0, reserve1 } = reserves
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
      const isSecPair = isSecurityPair({
        token0,
        token1,
        secTokens,
      })

      return [
        PairState.EXISTS,
        new Pair(
          CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
          CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
          isSecPair
        ),
      ]
    })
  }, [results, tokens, secTokens])
}

export function useV2Pair(tokenA?: Currency | null, tokenB?: Currency | null): [PairState, Pair | null] {
  const inputs: [[Currency | undefined | null, Currency | undefined | null]] = useMemo(
    () => [[tokenA, tokenB]],
    [tokenA, tokenB]
  )
  return useV2Pairs(inputs)[0]
}
