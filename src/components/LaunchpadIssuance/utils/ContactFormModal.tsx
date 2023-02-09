import React from 'react'
import Portal from '@reach/portal'
import styled from 'styled-components'
import { ExitIconContainer } from 'components/Launchpad/KYCPrompt/styled'
import { ContactForm } from 'components/Launchpad/KYCPrompt/ContactForm'

import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'

interface Props {
  offerId?: string
  issuanceId?: number
  open: boolean;
  closeForm: () => void
}

export const ContactFormModal = ({ open, closeForm, issuanceId, offerId }: Props) => {
  return (
    <>
      {open && (
        <Portal>
          <ModalWrapper>
            <ContactFormWrapper>
              <ExitIconContainer onClick={closeForm}>
                <CrossIcon />
              </ExitIconContainer>

              <ContactForm issuanceId={issuanceId} offerId={offerId} onSubmit={() => closeForm()} />
            </ContactFormWrapper>
          </ModalWrapper>
        </Portal>
      )}</>
  )
}

export const Container = styled.div<{ isRejected?: boolean }>`
  display: flex;

  flex-flow: column nowrap;
  align-items: stretch;

  gap: 0.5rem;
  padding: 1.5rem;

  max-height: 10%;
  border: 1px solid ${props => props.isRejected
    ? props.theme.launchpad.colors.border.error
    : props.theme.launchpad.colors.border.success};
  border-radius: 6px;
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