import React from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components/macro'
import { Trans } from '@lingui/macro'
import { useCookies } from 'react-cookie'

import { NotAvailablePage } from 'components/NotAvailablePage'
import { RowBetween } from 'components/Row'
import { TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { SupportedChainId } from 'constants/chains'
import useIXSCurrency from 'hooks/useIXSCurrency'
import useSwitchChain, { CHAIN_SWITCH_STRINGS } from 'hooks/useSwitchChain'
import { useActiveWeb3React } from 'hooks/web3'
import { TextGradient, TYPE } from 'theme'
import { LightBackground } from 'theme/Background'

import { Vesting } from './Vesting/Vesting'
import { StyledBodyWrapper } from './styleds'
import { Pinned } from 'components/Launchpad/Offers/Pinned'
import { PinnedContentButton } from 'components/Button'

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
  const { library, chainId, account } = useActiveWeb3React()
  const switchChain = useSwitchChain()
  const IXSCurrency = useIXSCurrency()
  const [cookies] = useCookies(['annoucementsSeen'])

  const blurred = ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0) || !account

  if (blurred || !account) {
    return <NotAvailablePage />
  }

  return (
    <>
      {/* <LightBackground /> */}
      <StyledBodyWrapper hasAnnouncement={!cookies.annoucementsSeen}>
        <PaddedRow>
          <TYPE.title4>
            <Trans>Vesting {IXSCurrency?.symbol}</Trans>
          </TYPE.title4>
          {library?.provider?.isMetaMask && chainId && !isMobile && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <VestingText>Vesting on {CHAIN_SWITCH_STRINGS[chainId as SupportedChainId]}?</VestingText>

              <PinnedContentButton
                style={{ background: 'none', color: '#6666FF', border: '1px solid #E6E6FF', marginLeft: '15px' }}
                onClick={() => switchChain.addChain()}
              >
                Switch networks
              </PinnedContentButton>
            </div>
          )}
        </PaddedRow>
        <Vesting />
      </StyledBodyWrapper>
    </>
  )
}
