import React from 'react'
import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import SecurityCard from 'components/SecurityCard'
import { useTokens } from 'pages/Pool/useTokens'
import { EmptyState } from './EmptyState'

export const MySecurities = () => {
  const {
    account,
    dataIsLoading,
    dataIsLoaded,
    v2IsLoading,
    showEmptyLiquidity,
    pairsPresent,
    v2PairsWithoutStakedAmount,
    stakingPairs,
    stakingInfosWithBalance,
  } = useTokens()

  return (
    <>
      {(!account || dataIsLoading || showEmptyLiquidity) && (
        <EmptyState account={account} v2IsLoading={v2IsLoading} showEmptyLiquidity={showEmptyLiquidity} />
      )}
      {dataIsLoaded && pairsPresent && (
        <TopStraightBackgroundWrapper>
          {v2PairsWithoutStakedAmount.map((v2Pair) => (
            <SecurityCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
          ))}
          {stakingPairs.map(
            (stakingPair, i) =>
              stakingPair[1] && ( // skip pairs that arent loaded
                <SecurityCard key={stakingInfosWithBalance[i].stakingRewardAddress} pair={stakingPair[1]} />
              )
          )}
        </TopStraightBackgroundWrapper>
      )}
    </>
  )
}
