import { Pair } from '@ixswap1/v2-sdk'
import { BIG_INT_ZERO } from 'constants/misc'
import { useV2Pairs } from 'hooks/useV2Pairs'
import { useActiveWeb3React } from 'hooks/web3'
import JSBI from 'jsbi'
import { useMemo } from 'react'
import { useStakingInfo } from 'state/stake/hooks'
import { useTrackedTokenPairs, toV2LiquidityToken } from 'state/user/hooks'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'

export const useTokens = () => {
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = useV2Pairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  // show liquidity even if its deposited in rewards contract
  const stakingInfo = useStakingInfo()
  const stakingInfosWithBalance = stakingInfo?.filter((pool) =>
    JSBI.greaterThan(pool.stakedAmount.quotient, BIG_INT_ZERO)
  )

  const stakingPairs = useV2Pairs(stakingInfosWithBalance?.map((stakingInfo) => stakingInfo.tokens))
  const dataIsLoaded = account && !v2IsLoading
  const dataIsLoading = account && v2IsLoading
  const pairsPresent = allV2PairsWithLiquidity?.length > 0 || stakingPairs?.length > 0
  const showEmptyLiquidity = Boolean(dataIsLoaded && !pairsPresent)

  // remove any pairs that also are included in pairs with stake in mining pool
  const v2PairsWithoutStakedAmount = allV2PairsWithLiquidity.filter((v2Pair) => {
    return (
      stakingPairs
        ?.map((stakingPair) => stakingPair[1])
        .filter((stakingPair) => stakingPair?.liquidityToken.address === v2Pair.liquidityToken.address).length === 0
    )
  })
  return {
    account,
    dataIsLoading,
    dataIsLoaded,
    v2IsLoading,
    showEmptyLiquidity,
    pairsPresent,
    v2PairsWithoutStakedAmount,
    stakingPairs,
    stakingInfosWithBalance,
  }
}
