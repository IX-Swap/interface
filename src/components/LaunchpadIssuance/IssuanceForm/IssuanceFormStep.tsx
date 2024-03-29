import { text13, text3, text50 } from 'components/LaunchpadMisc/typography'
import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  description: React.ReactNode
  icon: React.ReactNode
  stepNumber: number
}

export const IssuanceFormStep: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <StepContainer>
      <StepNumberLabel>STEP {props.stepNumber}</StepNumberLabel>

      <StepIcon>{props.icon}</StepIcon>

      <StepInfo>
        <StepInfoTitle>{props.title}</StepInfoTitle>
        <StepInfoDescription>{props.description}</StepInfoDescription>
      </StepInfo>

      <StepAction>{props.children}</StepAction>
    </StepContainer>
  )
}

const _CenteredColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const StepContainer = styled(_CenteredColumn)`
  position: relative;
  gap: 2rem;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default + 'cc'};
  border-radius: 8px;
`

const StepIcon = styled.div`
  display: grid;
  place-content: center;
  padding: 2rem;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 50%;
`

const StepInfo = styled(_CenteredColumn)`
  gap: 0.5rem;
  max-width: 60%;
`

const StepInfoTitle = styled.div`
  ${text50}

  text-align: center;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const StepInfoDescription = styled.div`
  ${text3}
  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.text.body};
`

const StepAction = styled(_CenteredColumn)`
  gap: 0.5rem;
`

const StepNumberLabel = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;

  ${text13}

  color: #8f8fb2;
`
