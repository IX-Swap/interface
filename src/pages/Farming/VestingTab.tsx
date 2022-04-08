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
import { BodyWrapper } from 'pages/AppBody'

const PaddedRow = styled(RowBetween)`
  padding: 0 15px;
  flex-wrap: wrap;
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
      <LightBackground />
      <BodyWrapper
        hasAnnouncement={!cookies.annoucementsSeen}
        style={{ background: 'transparent', padding: 0, width: '100%', maxWidth: 1299 }}
      >
        <PaddedRow>
          <TYPE.title4>
            <Trans>Vesting {IXSCurrency?.symbol}</Trans>
          </TYPE.title4>
          {library?.provider?.isMetaMask && chainId && !isMobile && (
            <TextGradient style={{ cursor: 'pointer', marginLeft: '5px' }} onClick={() => switchChain.addChain()}>
              <Trans>Vesting on {CHAIN_SWITCH_STRINGS[chainId as SupportedChainId]}? Switch networks</Trans>
            </TextGradient>
          )}
        </PaddedRow>

        <Vesting />
      </BodyWrapper>
    </>
  )
}
