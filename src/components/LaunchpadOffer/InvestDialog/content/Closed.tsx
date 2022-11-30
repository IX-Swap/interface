import React from 'react'
import styled, { useTheme } from 'styled-components'

import { CheckCircle } from 'react-feather'

import { InvestFormSubmitButton, InvestSubmitState } from '../utils/InvestSubmitButton'
import { InvestFormContainer } from './styled'
import { Separator } from 'components/LaunchpadOffer/styled'
import { Offer, OfferStatus } from 'state/launchpad/types'
import Row from 'components/Row'

interface Props {
  offer: Offer
}

export const ClosedStage: React.FC<Props> = (props) => {
  const theme = useTheme()

  const canClaim = React.useMemo(() => props.offer.status === OfferStatus.claim, [])

  return (
    <InvestFormContainer gap="1.5rem">
      <Title>Closed</Title>

      <InvestFormSubmitButton disabled state={InvestSubmitState.success}>
        This deal has been successfully funded <CheckCircle size="15" color={theme.launchpad.colors.success} />
      </InvestFormSubmitButton>

      <div style={{ justifyContent: ''}}></div>

      <Separator />
      
      <InvestmentClaim>
        <MyInvestment>
          <MyInvestmentLabel>My Investment</MyInvestmentLabel>
          <MyInvestmentAmount>1023 {props.offer.tokenSymbol}</MyInvestmentAmount>
        </MyInvestment>

        <ClaimButton disabled={!canClaim}>
          Claim
        </ClaimButton>
      </InvestmentClaim>

      <Separator />

      {!canClaim && (
         <Row justifyContent=""></Row>
      )}
      <Separator />
    </InvestFormContainer>
  )
}

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;

  line-height: 29px;
  letter-spacing: -0.04em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const InvestmentClaim = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const MyInvestment = styled.div`
`

const MyInvestmentLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const MyInvestmentAmount = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;

  line-height: 24px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const ClaimButton = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 15px;

  line-height: 18px;
  letter-spacing: -0.02em;

  height: 50px;

  color: ${props => props.disabled 
    ? props.theme.launchpad.colors.text.light
    : props.theme.launchpad.colors.primary};

  background: ${props => props.disabled
    ? props.theme.launchpad.colors.disabled
    : props.theme.launchpad.colors.background};

  border: ${props => props.disabled ? 'none' : `1px solid ${props.theme.launchpad.colors.border.default}`};
  border-radius: 6px;

  padding: 0.25rem 3rem;
`