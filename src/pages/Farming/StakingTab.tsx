import React from 'react'
import { Trans } from '@lingui/macro'
import useIXSCurrency from 'hooks/useIXSCurrency'
import styled from 'styled-components'

import { useActiveWeb3React } from 'hooks/web3'
import { NotAvailablePage } from 'components/NotAvailablePage'
import { TYPE } from 'theme'
import { LightBackground } from 'theme/Background'

import { Staking } from './Staking'
import { Container } from './styleds'
import { TGE_CHAINS_WITH_STAKING } from 'constants/addresses'

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

  const blurred = !TGE_CHAINS_WITH_STAKING.includes(chainId || 0) || !account

  if (blurred) return <NotAvailablePage />

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
