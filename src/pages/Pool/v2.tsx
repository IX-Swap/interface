import { Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import { TipCard } from 'components/Card'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter } from 'components/Row'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import React, { FC } from 'react'
import { Flex } from 'rebass'
import { getPoolTransactionHash } from 'state/pool/hooks'
import { useIsTransactionPending } from 'state/transactions/hooks'
import styled from 'styled-components'
import { ExternalLink, TYPE } from 'theme'
import { ReactComponent as ExternalIcon } from '../../assets/images/external.svg'
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

const LinkTitle = styled(TYPE.body1)`
  color: ${({ theme }) => theme.text1};
  font-weight: 600;
`

const TopContent: FC = () => {
  return (
    <TipCard
      style={{
        display: 'flex',
        maxWidth: '592px',
        marginTop: isMobile ? '0rem' : '3rem',
        marginBottom: isMobile ? '3rem' : '0rem',
      }}
      padding="1rem 20px"
      as={ExternalLink}
      href="https://info.ixswap.io/home"
    >
      <RowCenter style={{ gap: '10px', marginTop: '5px' }}>
        <Flex style={{ gap: '5px' }}>
          <LinkTitle style={{ fontSize: '16px' }}>Top Pools</LinkTitle>
          <ExternalIcon></ExternalIcon>
        </Flex>
        <TYPE.body1>Explore popular pools on IX Swap Analytics</TYPE.body1>
      </RowCenter>
    </TipCard>
  )
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
  } = useTokens()
  const { chainId } = useActiveWeb3React()
  const currentHashTransaction = getPoolTransactionHash()
  const pending = useIsTransactionPending(currentHashTransaction)
  const isBlurred = chainId !== undefined && !TGE_CHAINS_WITH_SWAP.includes(chainId)
  return (
    <>
      {!isBlurred && !isMobile && <TopContent />}
      <AppBody blurred={isBlurred}>
        {!isBlurred && isMobile && <TopContent />}
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
                {!pending ? (
                  <>
                    {v2PairsWithoutStakedAmount.map((v2Pair) => (
                      <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                    ))}
                    {/* {stakingPairs.map(
                      (stakingPair, i) =>
                        stakingPair[1] && ( // skip pairs that arent loaded
                          <FullPositionCard
                            key={stakingInfosWithBalance[i].stakingRewardAddress}
                            pair={stakingPair[1]}
                            stakedBalance={stakingInfosWithBalance[i].stakedAmount}
                          />
                        )
                    )} */}
                  </>
                ) : (
                  <RowCenter style={{ margin: '68px 0px' }}>
                    <LoaderThin size={128} />
                  </RowCenter>
                )}
                <ImportPool />
              </TopStraightBackgroundWrapper>
            )}
          </AutoColumn>
        </AutoColumn>
      </AppBody>
    </>
  )
}
