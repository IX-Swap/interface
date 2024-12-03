import React from 'react'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import { useCookies } from 'react-cookie'

import { RowBetween } from 'components/Row'
import { TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import useIXSCurrency from 'hooks/useIXSCurrency'
import { TYPE } from 'theme'

import { Vesting } from './Vesting/Vesting'
import { StyledBodyWrapper } from './styleds'
import { useWeb3React } from 'hooks/useWeb3React'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'
import ConnectWalletCard from 'components/NotAvailablePage/ConnectWalletCard'
import { DEFAULT_CHAIN_ID } from 'config'

const PaddedRow = styled(RowBetween)`
  padding: 40px 30px 0px 30px;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.config.background?.secondary || 'white'};
  width: 100%;
  // max-width: 1300px;
`

const VestingText = styled.div`
  color: #8f8fb2;
  font-size: 13px;
  font-weight: 500;
  min-inline-size: fit-content;
`

export const VestingTab = () => {
  const { chainId, account } = useWeb3React()
  const IXSCurrency = useIXSCurrency()
  const [cookies] = useCookies(['annoucementsSeen'])

  const blurred = ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0) || !account

  if (!account) {
    return <ConnectWalletCard />
  }

  if (blurred) {
    return <NetworkNotAvailable expectChainId={Number(DEFAULT_CHAIN_ID)} />
  }

  return (
    <>
      {/* <LightBackground /> */}
      <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
        <PaddedRow>
          <TYPE.title4>
            <Trans>Vesting {IXSCurrency?.symbol}</Trans>
          </TYPE.title4>
        </PaddedRow>
        <Vesting />
      </StyledBodyWrapper>
    </>
  )
}
