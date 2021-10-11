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
import { ConnectWallet } from './ConnectWallet'
import { useActiveWeb3React } from 'hooks/web3'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'

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
  const { chainId } = useActiveWeb3React()
  return (
    <>
      <AppBody {...bodyProps} blurred={chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)}>
        <SwapPoolTabs active={'pool'} />
        <AutoColumn gap="1.5rem" justify="center">
          <AutoColumn gap="md" style={{ width: '100%' }}>
            <MarginerTitle>
              <AutoColumn gap="20px" style={{ width: '100%' }}>
                <LiquidityTitle />
                <AddLiquidityButton />
              </AutoColumn>
            </MarginerTitle>
            {!account && <ConnectWallet message={<Trans>Connect a wallet to view your Liquidity.</Trans>} />}
            {account && (dataIsLoading || showEmptyLiquidity) && (
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
