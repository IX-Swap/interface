import React from 'react'
import { Trans } from '@lingui/macro'
import useIXSCurrency from 'hooks/useIXSCurrency'
import styled from 'styled-components'

import { useActiveWeb3React } from 'hooks/web3'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { TYPE } from 'theme'
import { LightBackground } from 'theme/Background'
import { SUPPORTED_TGE_CHAINS, TGE_CHAINS_WITH_STAKING } from 'constants/addresses'

import { Staking } from './Staking'
import { Container } from './styleds'

const StyledStakingTab = styled.div`
  max-width: 90vw;
  padding-left: 50px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
   padding-left: 15px;
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
   padding-left: 5px;
  `};
`
export const StakingTab = () => {
  const IXSCurrency = useIXSCurrency()
  const { chainId, account } = useActiveWeb3React()

  const blurred = ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0) || !account

  if (blurred || !account) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <NotAvailablePage />
      </div>
    )
  }

  return (
    <>
      <LightBackground />
      <Container width={['100%']} maxWidth={'1400px'}>
        <StyledStakingTab>
          <TYPE.title4>
            <Trans>Staking {IXSCurrency?.symbol}</Trans>
          </TYPE.title4>
        </StyledStakingTab>
        <Staking />
      </Container>
    </>
  )
}
