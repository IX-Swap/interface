import React from 'react'
import Portal from '@reach/portal'
import styled, { useTheme } from 'styled-components'

import { FormSubmitContainer } from './styled'

import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { ExitIconContainer } from 'components/Launchpad/KYCPrompt/styled'
import { ContactForm } from 'components/Launchpad/KYCPrompt/ContactForm'

import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import { ReactComponent as WarningIcon } from 'assets/launchpad/svg/warn-icon.svg'

interface Props {
  message?: string
  vettingId?: number

  onClear: () => void
  onContactUs: () => void
  onSubmit: () => void
}

export const RejectInfo: React.FC<Props> = (props) => {
  const theme = useTheme()

  const [contactFormOpen, setContactForm] = React.useState(false)
  const toggleContactForm = React.useCallback(() => setContactForm(state => !state), [])

  return (
    <Container error={props.message}>
      <Title> Reason for Rejection
        <WarningIcon />        
      </Title>

      <Message>{props.message}</Message>

      <ButtonsContainer>
        <FilledButton
          onClick={props.onSubmit}
          color={theme.launchpad.colors.text.light}
          background={theme.launchpad.colors.text.warning}>Try again
        </FilledButton>

        <OutlineButton onClick={props.onClear}
          color={theme.launchpad.colors.text.warning}
          borderColor={theme.launchpad.colors.text.warning}>New Form
        </OutlineButton>
      </ButtonsContainer>

      <HelpButton onClick={toggleContactForm}>Contact Support</HelpButton>

      {contactFormOpen && (
        <Portal>
          <ModalWrapper>
            <ContactFormWrapper>
              <ExitIconContainer onClick={toggleContactForm}>
                <CrossIcon />
              </ExitIconContainer>

              <ContactForm offerId={`${props.vettingId}`} onSubmit={() => setContactForm(false)} />
            </ContactFormWrapper>
          </ModalWrapper>
        </Portal>
      )}

    </Container>
  )
}

export const Container = styled.div<{ error?: string }>`
  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;

  gap: 0.5rem;
  padding: 1.5rem;

  max-height: 10%;
  border: 1px solid ${ props => props.error
    ? props.theme.launchpad.colors.border.error
    : props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;

  -webkit-justify-content: space-between;
  justify-content: space-between;

  margin-bottom: 0.5rem;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  letter-spacing: -0.01em;

  flex: none;
  order: 0;
  flex-grow: 0;
  
  -webkit-justify-content: space-between;
  justify-content: space-between;

  color: ${props => props.theme.launchpad.colors.text.warning};
`

export const Message = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;

  letter-spacing: -0.02em;

  flex: none;
  flex-grow: 0;

  margin: 0.5rem 0 0.75rem 0;

  color: ${props => props.theme.launchpad.colors.text.warning};
`

const HelpButton = styled.div`
  display: grid;
  place-content: center;

  background: ${props => props.theme.launchpad.colors.background};
  border: 1px solid ${props => props.theme.launchpad.colors.border.error};
  border-radius: 6px;

  cursor: pointer;

  font-style: normal;

  height: 60px;
  
  text-align: center;

  font-weight: 600;
  font-size: 13px;
  line-height: 16px;

  letter-spacing: -0.02em;

  color: #FF8282;

  flex: none;
  order: 0;
  flex-grow: 0;

  color: ${props => props.theme.launchpad.colors.text.warning};

  transition: background 0.4s;

  :hover {
    background: ${props => props.theme.launchpad.colors.foreground + 'b1'};
  }
`

const ModalWrapper = styled.div`
  display: grid;
  place-content: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
 
  z-index: 50;

  backdrop-filter: blur(20px);
`

const ContactFormWrapper = styled.div`
  display: flex;

  flex-flow: column nowrap;
  align-items: center;

  gap: 1rem;
 
  position: relative;

  width: 480px;

  background: ${props => props.theme.launchpad.colors.background};
  border-radius: 8px;
  padding: 2rem;
`