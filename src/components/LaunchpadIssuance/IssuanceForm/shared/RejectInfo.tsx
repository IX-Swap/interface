import React from 'react'
import Portal from '@reach/portal'
import styled, { useTheme } from 'styled-components'

import { IssuanceStatus } from 'components/LaunchpadIssuance/types'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { ExitIconContainer } from 'components/Launchpad/KYCPrompt/styled'
import { ContactForm } from 'components/Launchpad/KYCPrompt/ContactForm'

import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'
import { ReactComponent as InfoIcon } from 'assets/launchpad/svg/req-icon.svg'
import { ReactComponent as WarningIcon } from 'assets/launchpad/svg/warn-icon.svg'
import { text1, text19, text30 } from 'components/LaunchpadMisc/typography'

interface Props {
  message?: string
  issuanceId?: number | string
  status?: IssuanceStatus

  onClear: () => void
  onSubmit: () => void
}

export const RejectInfo: React.FC<Props> = (props) => {
  const theme = useTheme()

  const [contactFormOpen, setContactForm] = React.useState<boolean>(false)
  const isRejected = props.status === IssuanceStatus.declined
  const toggleContactForm = React.useCallback(() => setContactForm((state) => !state), [])

  return (
    <Container isRejected={isRejected}>
      <Title isRejected={isRejected}>
        {' '}
        {isRejected ? 'Reason for Rejection' : 'Required Updates'}
        {isRejected ? <WarningIcon /> : <InfoIcon />}
      </Title>

      <Message isRejected={isRejected}>{props.message}</Message>

      {isRejected && (
        <ButtonsContainer>
          <FilledButton
            onClick={props.onSubmit}
            color={theme.launchpad.colors.text.light}
            background={theme.launchpad.colors.text.warning}
          >
            Try again
          </FilledButton>

          <OutlineButton
            onClick={props.onClear}
            color={theme.launchpad.colors.text.warning}
            borderColor={theme.launchpad.colors.text.warning}
          >
            New Form
          </OutlineButton>
        </ButtonsContainer>
      )}

      {isRejected && <HelpButton onClick={toggleContactForm}>Contact Support</HelpButton>}

      {contactFormOpen && (
        <Portal>
          <ModalWrapper>
            <ContactFormWrapper>
              <ExitIconContainer onClick={toggleContactForm}>
                <CrossIcon />
              </ExitIconContainer>

              <ContactForm issuanceId={props.issuanceId} onSubmit={() => setContactForm(false)} />
            </ContactFormWrapper>
          </ModalWrapper>
        </Portal>
      )}
    </Container>
  )
}

export const Container = styled.div<{ isRejected?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 0.5rem;
  padding: 1.5rem;
  max-height: 10%;
  border: 1px solid
    ${(props) =>
      props.isRejected ? props.theme.launchpad.colors.border.error : props.theme.launchpad.colors.border.success};
  border-radius: 6px;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const Title = styled.div<{ isRejected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${text30}

  flex: none;
  order: 0;
  flex-grow: 0;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  color: ${(props) =>
    props.isRejected ? props.theme.launchpad.colors.text.warning : props.theme.launchpad.colors.text.title};
`

export const Message = styled.div<{ isRejected?: boolean }>`
  ${text19}
  flex: none;
  flex-grow: 0;
  margin: 0.5rem 0 0.75rem 0;
  color: ${(props) =>
    props.isRejected ? props.theme.launchpad.colors.text.warning : props.theme.launchpad.colors.text.body};
`

const HelpButton = styled.div`
  display: grid;
  place-content: center;
  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.error};
  border-radius: 6px;
  cursor: pointer;
  height: 60px;
  text-align: center;

  ${text1}

  color: #ff8282;
  flex: none;
  order: 0;
  flex-grow: 0;
  color: ${(props) => props.theme.launchpad.colors.text.warning};
  transition: background 0.4s;

  :hover {
    background: ${(props) => props.theme.launchpad.colors.foreground + 'b1'};
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
  background: ${(props) => props.theme.launchpad.colors.background};
  border-radius: 8px;
  padding: 2rem;
`
