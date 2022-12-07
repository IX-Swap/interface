import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Mail, CheckCircle } from 'react-feather'

import { Separator } from 'components/LaunchpadOffer/styled'
import { InvestFormContainer, Title } from './styled'

import { InvestTextField } from '../utils/InvestTextField'
import { InvestFormSubmitButton, InvestSubmitState, useInvestSubmitState } from '../utils/InvestSubmitButton'

interface Props {
  symbol: string
}

export const RegisterToInvestStage: React.FC<Props> = (props) => {
  const theme = useTheme()
  const submitState = useInvestSubmitState()

  const [isInterested, setIsInterested] = React.useState<boolean>()

  const onInvestmentChange = React.useCallback((value: string) => {
    1 + 1
  }, [])

  const submit = React.useCallback(() => {
    if (submitState.current === InvestSubmitState.default) {
      submitState.setSuccess()
    } else {
      submitState.setDefault()
    }
  }, [submitState])

  return (
    <InvestFormContainer gap="1.5rem" padding="0 0 2rem 0">
      <Title>
        Are you interested to participate in this deal? 
      </Title>

      <ParticipationInterest>
        <ParticipationInterestButton active={isInterested === true} onClick={() => setIsInterested(true)}>
          Yes
        </ParticipationInterestButton>

        <ParticipationInterestButton active={isInterested === false} onClick={() => setIsInterested(false)}>
          No
        </ParticipationInterestButton>
      </ParticipationInterest>

      <InvestTextField 
        type="number" 
        label="How much will be your estimated investment?"
        trailing={<CurrencyLabel>{props.symbol}</CurrencyLabel>}
        onChange={onInvestmentChange}
      />

      <InvestFormSubmitButton state={submitState.current} onSubmit={submit}>
        {submitState.current === InvestSubmitState.success && <>Submitted <CheckCircle size="15" color={theme.launchpad.colors.success} /></>}
        {submitState.current === InvestSubmitState.default && 'Submit'}
      </InvestFormSubmitButton>

      <Separator />
      
      <InvestTextField 
        type="email" 
        label="Sign Up for Updates"
        placeholder={<EmailPlaceholder><Mail size="16" /> Email Address</EmailPlaceholder>}
        onChange={onInvestmentChange}
      />
    </InvestFormContainer>
  )
}

const ParticipationInterest = styled.div`
  display: flex;
  flex-flow: row nowrap;

  justify-content: spaced-evenly;
  align-items: stretch;

  height: 60px;

  > button:first-child {
    border-radius: 8px 0 0 8px;
  }

  > button:last-child {
    border-radius: 0 8px 8px 0;
  }
`
const ParticipationInterestButton = styled.button<{ active: boolean }>`
  flex-grow: 1;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  line-height: 19px;
  letter-spacing: -0.02em;

  border: 1px solid ${props => props.theme.launchpad.colors.primary};

  cursor: pointer;

  color: ${props => props.active 
    ? props.theme.launchpad.colors.text.light
    : props.theme.launchpad.colors.primary};

  background: ${props => props.active 
    ? props.theme.launchpad.colors.primary
    : props.theme.launchpad.colors.foreground};
`

const EmailPlaceholder = styled.div`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.bodyAlt};
`

const CurrencyLabel = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 17px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`