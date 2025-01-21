import React from 'react'
import { Trans } from '@lingui/macro'

import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter } from 'components/Row'
import { getPoolTransactionHash } from 'state/pool/hooks'
import { useIsTransactionPending } from 'state/transactions/hooks'
import { MobileAndTablet } from 'theme'

import { AutoColumn } from '../../components/Column'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import FullPositionCard from '../../components/PositionCard'
import { AddLiquidityButton } from './AddLiquidityButton'
import { ConnectWallet } from './ConnectWallet'
import { ImportPool } from './ImportPool'
import { LiquidityTitle } from './LiquidityTitle'
import { NoPairs } from './NoPairs'
import { LiquidityInnerTitle, MarginerTitle } from './styleds'
import { useTokens } from './useTokens'

const PoolContent: React.FC = () => {
  const {
    account,
    dataIsLoading,
    dataIsLoaded,
    v2IsLoading,
    showEmptyLiquidity,
    pairsPresent,
    v2PairsWithoutStakedAmount,
  } = useTokens()
  const currentHashTransaction = getPoolTransactionHash()
  const pending = useIsTransactionPending(currentHashTransaction)

  return (
    <>
      <MobileAndTablet style={{ marginBottom: '1rem' }}>{/* <TopContent /> */}</MobileAndTablet>
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
            <>
              <LiquidityInnerTitle>
                <Trans>My Liquidity</Trans>
              </LiquidityInnerTitle>
              <TopStraightBackgroundWrapper>
                {!pending ? (
                  <>
                    {v2PairsWithoutStakedAmount.map((v2Pair) => (
                      <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                    ))}
                  </>
                ) : (
                  <RowCenter style={{ margin: '68px 0px' }}>
                    <LoaderThin size={128} />
                  </RowCenter>
                )}
              </TopStraightBackgroundWrapper>
              <ImportPool />
            </>
          )}
        </AutoColumn>
      </AutoColumn>
    </>
  )
}

export default PoolContent
