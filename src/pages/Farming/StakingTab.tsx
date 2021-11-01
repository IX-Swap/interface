import { Trans } from '@lingui/macro'
import useIXSCurrency from 'hooks/useIXSCurrency'
import React from 'react'
import { TYPE } from 'theme'
import { LightBackground } from 'theme/Background'
import { Staking } from './Staking'
import { Container } from './styleds'
import styled from 'styled-components'

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
