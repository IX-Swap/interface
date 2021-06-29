import React from 'react'
import { Trans } from '@lingui/macro'
import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import AppBody from 'pages/AppBody'
import { AutoColumn } from '../../components/Column'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import FullPositionCard from '../../components/PositionCard'
import { AddLiquidityButton } from './AddLiquidityButton'
import { ImportPool } from './ImportPool'
import { LiquidityTitle } from './LiquidityTitle'
import { NoPairs } from './NoPairs'
import { LiquidityInnerTitle, MarginerTitle } from './styleds'
import { useTokens } from './useTokens'

const bodyProps = {
  padding: '0',
  paddingXS: '0',
}

export default function Pool() {
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
      <AppBody {...bodyProps}>
        <SwapPoolTabs active={'pool'} />
        <AutoColumn gap="1.5rem" justify="center">
          <AutoColumn gap="md" style={{ width: '100%' }}>
            <MarginerTitle>
              <AutoColumn gap="20px" style={{ width: '100%' }}>
                <LiquidityTitle />
                <AddLiquidityButton />
              </AutoColumn>
            </MarginerTitle>
            {(!account || dataIsLoading || showEmptyLiquidity) && (
              <NoPairs account={account} v2IsLoading={v2IsLoading} showEmptyLiquidity={showEmptyLiquidity} />
            )}
            {dataIsLoaded && pairsPresent && (
              <TopStraightBackgroundWrapper>
                <LiquidityInnerTitle>
                  <Trans>My Liquidity</Trans>
                </LiquidityInnerTitle>
                <>
                  {v2PairsWithoutStakedAmount.map((v2Pair) => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                  {stakingPairs.map(
                    (stakingPair, i) =>
                      stakingPair[1] && ( // skip pairs that arent loaded
                        <FullPositionCard
                          key={stakingInfosWithBalance[i].stakingRewardAddress}
                          pair={stakingPair[1]}
                          stakedBalance={stakingInfosWithBalance[i].stakedAmount}
                        />
                      )
                  )}
                </>
                <ImportPool />
              </TopStraightBackgroundWrapper>
            )}
          </AutoColumn>
        </AutoColumn>
      </AppBody>
    </>
  )
}
