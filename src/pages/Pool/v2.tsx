import React, { FC } from 'react'
import { Flex } from 'rebass'
import { Trans } from '@lingui/macro'
import styled from 'styled-components'

import { TopStraightBackgroundWrapper } from 'components/BottomHalfWrapper'
import { TipCard } from 'components/Card'
import { LoaderThin } from 'components/Loader/LoaderThin'
import { RowCenter } from 'components/Row'
import { TGE_CHAINS_WITH_SWAP } from 'constants/addresses'
import { useActiveWeb3React } from 'hooks/web3'
import AppBody from 'pages/AppBody'
import { getPoolTransactionHash } from 'state/pool/hooks'
import { useIsTransactionPending } from 'state/transactions/hooks'
import { useWhitelabelState } from 'state/whitelabel/hooks'
import { DesktopOnly, ExternalLink, MobileAndTablet, TYPE } from 'theme'

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
import { AddLiduidityContainer } from 'pages/AddLiquidityV2/redirects'
// import { Header } from 'pages/Launchpad/Header'
import { useSetHideHeader } from 'state/application/hooks'
import { SUPPORTED_TGE_CHAINS, TGE_CHAINS_WITH_STAKING } from 'constants/addresses'
import Portal from '@reach/portal'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'
import Header from 'components/Header'
const LinkTitle = styled(TYPE.body1)`
  color: ${({ theme }) => theme.text1};
  font-weight: 600;
`

const StyledRowCenter = styled(RowCenter)`
  margin-top: 5px;
  gap: 10px;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    gap: 5px;
  `};
`

const StyledTipCard = styled(TipCard)`
  padding: 1rem 20px;
  display: flex;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 16px;
  `};
`

const TopContent: FC = () => {
  const { config } = useWhitelabelState()
  return (
    <StyledTipCard as={ExternalLink} href="https://info.ixswap.io/home">
      <StyledRowCenter>
        <Flex style={{ gap: '5px' }}>
          <LinkTitle style={{ fontSize: '16px' }}>Top Pools</LinkTitle>
          <ExternalIcon></ExternalIcon>
        </Flex>
        <TYPE.body1 textAlign="center">Explore popular pools on {config?.name || 'IX Swap'} Analytics</TYPE.body1>
      </StyledRowCenter>
    </StyledTipCard>
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

  const hideHeader = useSetHideHeader()

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  const blurred = React.useMemo(
    () => ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0),
    [account, chainId]
  )

  if (blurred) {
    return (
      <Portal>
        <CenteredFixed width="100vw" height="100vh">
          <NetworkNotAvailable />
        </CenteredFixed>
      </Portal>
    )
  }
  return (
    <>
      <Header />
      {/* <AddLiduidityContainer> */}
      {!isBlurred && <DesktopOnly>{/* <TopContent /> */}</DesktopOnly>}
      <AppBody page="liquidity" blurred={isBlurred}>
        {!isBlurred && <MobileAndTablet style={{ marginBottom: '1rem' }}>{/* <TopContent /> */}</MobileAndTablet>}
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
                </TopStraightBackgroundWrapper>
                <ImportPool />
              </>
            )}
          </AutoColumn>
        </AutoColumn>
      </AppBody>
      {/* </AddLiduidityContainer> */}
    </>
  )
}
