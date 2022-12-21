import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ReactComponent as VettingIcon } from 'assets/launchpad/svg/issuance-vetting-check.svg'
import { ReactComponent as IssuanceInformationIcon } from 'assets/launchpad/svg/issuance-information-icon.svg'

import { IssuanceFormStep } from './IssuanceFormStep'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { ArrowLeft, Plus } from 'react-feather'

export const IssuanceForm = () => {
  const theme = useTheme()

  return (
    <Wrapper>
      <FormHeader>
        <BackButton background={theme.launchpad.colors.background}>
          <ArrowLeft color={theme.launchpad.colors.primary} />
        </BackButton>

        <FormTitle>New Issuance</FormTitle>

        <IssuanceName>
          Brix Capital
        </IssuanceName>
        
        <NewIssuanceButton>
          <Plus size="15" color={theme.launchpad.colors.primary} /> New Issuance
        </NewIssuanceButton>
      </FormHeader>

      <FormContainer>
        <IssuanceFormStep 
          stepNumber={1} 
          icon={<VettingIcon />}
          title="Initiate Vetting Process" 
          description="The new issuance created will have to undergo a vetting process before it can be approved and issued to investors."
        >
          <FilledButton color={theme.launchpad.colors.text.light} background={theme.launchpad.colors.primary}>
            Proceed
          </FilledButton>
        </IssuanceFormStep>
        
        <IssuanceFormStep 
          stepNumber={2} 
          icon={<IssuanceInformationIcon />}
          title="Issuance Information" 
          description="All information provided about the new issuance created will be displayed to the investors."
        >
          <FilledButton color={theme.launchpad.colors.text.light} background={theme.launchpad.colors.primary}>
            Proceed
          </FilledButton>
        </IssuanceFormStep>
      </FormContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  justify-content: flex-start;
  algin-items: stretch;

  gap: 1rem;

  max-width: 1180px;
  padding: 1rem;
  margin: auto;
`

const FormHeader = styled.div`
  display: grid;

  grid-template-columns: 48px 232px 1fr 180px;
  grid-template-rows: repeat(2, 48px);
  grid-template-areas:
    "back title . button"
    "name name . .";

  gap: 1rem;
`

const FormContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 530px;

  place-content: stretch;

  gap: 1.5rem;

`

const IssuanceName = styled.div`
  grid-area: name;
  
  display: flex;
  flex-flow: row nowrap;

  justify-content: flex-start;
  algin-items: center;

  padding: 1rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  line-height: 48px;
  letter-spacing: -0.01em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const FormTitle = styled.div`
  grid-area: title;

  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const BackButton = styled(FilledButton)`
  grid-area: back;
`

const NewIssuanceButton = styled(OutlineButton)`
  grid-area: button;
`
