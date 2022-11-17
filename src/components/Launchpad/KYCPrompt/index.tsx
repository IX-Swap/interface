import React from 'react'
import styled, { keyframes } from 'styled-components'

import { useWeb3React } from '@web3-react/core'

import { Link } from 'react-router-dom'

import { PromptFooter } from './PromptFooter'

import { ReactComponent as KYCPromptIcon } from 'assets/launchpad/svg/kyc-prompt-icon.svg'
import { ReactComponent as Loading } from 'assets/launchpad/svg/loader.svg'
import { ReactComponent as ErrorIcon } from 'assets/launchpad/svg/error-icon.svg'
import { ReactComponent as ContactUsIcon } from 'assets/launchpad/svg/contact-us-icon.svg'
import { ReactComponent as CrossIcon } from 'assets/images/cross.svg'


import Modal from 'components/Modal'

import { useKYCState } from 'state/kyc/hooks'

import { KYCStatuses } from 'pages/KYC/enum'

import { TextAreaField, TextField } from './TextField'
import { ConnectionDialog } from '../Wallet/ConnectionDialog'

interface Props {
  allowOnlyAccredited: boolean
}

export const KYCPrompt: React.FC<Props> = (props) => {
  const { account } = useWeb3React()
  const { kyc } = useKYCState()

  const [isOpen, setIsOpen] = React.useState(true)
  const toggleModal = React.useCallback((isOpen?: boolean) => setIsOpen(state => isOpen ?? !state), [])

  const [contactFormOpen, setContactForm] = React.useState(false)

  const toggleContactForm = React.useCallback(() => setContactForm(state => !state), [])

  const showFooter = React.useMemo(() => !contactFormOpen && (!kyc || [KYCStatuses.NOT_SUBMITTED, KYCStatuses.PENDING].includes(kyc.status)), [kyc])

  return (
    <Modal isOpen={isOpen} onDismiss={() => toggleModal(false)}>
      <ExitIconContainer onClick={() => toggleModal(false)}>
        <CrossIcon />
      </ExitIconContainer>

      {!account && <ConnectionDialog onConnect={() => toggleModal(true)} />}

      {account && (
        <KYCPromptContainer>
          {!contactFormOpen && (
            <>
              {(!kyc || kyc.status === KYCStatuses.NOT_SUBMITTED) && (
                <>
                  <KYCPromptIconContainer>
                    <KYCPromptIcon />
                  </KYCPromptIconContainer>

                  <KYCPromptTitle>
                    Verify your account to participate in the deals on IXS Launchpad
                  </KYCPromptTitle>

                  <VerifyButton to="/kyc">
                    Verify Account
                  </VerifyButton>
                </>
              )}

              {kyc && kyc.status === KYCStatuses.PENDING && (
                <>
                  <KYCLoadingIconContainer>
                    <Loading />
                  </KYCLoadingIconContainer>

                  <KYCPromptTitle>
                    We are still verifying your account 
                  </KYCPromptTitle>

                  <VerifyButton to="/kyc">
                    Check status
                  </VerifyButton>
                </>
              )}

              {kyc && kyc.status === KYCStatuses.APPROVED && props.allowOnlyAccredited && !kyc.individual?.accredited && (
                <>
                  <KYCPromptIconContainer>
                    <ErrorIcon />
                  </KYCPromptIconContainer>

                  <KYCPromptTitle>
                    To access this deal you have to be an accredited investor
                  </KYCPromptTitle>
                  
                  <ContactUsButton type="button" onClick={() => toggleModal()}>
                    Close
                  </ContactUsButton>
                </>
              )}

              {kyc && kyc.status === KYCStatuses.REJECTED && (
                <>
                  <KYCPromptIconContainer>
                    <ErrorIcon />
                  </KYCPromptIconContainer>
                  
                  <KYCPromptTitle>
                    Your account verification was unsuccessful, 
                    therefore you are not able to participate in 
                    any deals. If you believe there is an issue 
                    please contact us. 
                  </KYCPromptTitle>

                  <ContactUsButton type="button" onClick={toggleContactForm}>
                    Contact us
                  </ContactUsButton>
                  
                  <Caption>
                    You only have to verify your account once, we are sorry for any inconvenience caused.
                  </Caption>
                </>
              )}

              {showFooter && <PromptFooter />}
            </>
          )}

          {contactFormOpen && (
            <>
              <KYCPromptIconContainer>
                <ContactUsIcon />
              </KYCPromptIconContainer>

              <KYCPromptTitle>
                Leave us a message
              </KYCPromptTitle>

              <TextField label="Subject"/>
              <TextField label="Email Address" />
              <TextAreaField label="How can we help You?" />


              <ContactUsButton>
                Send
              </ContactUsButton>

              <Caption>Our team will follow up with you shortly.</Caption>
            </>
          )}
        </KYCPromptContainer>
      )}
    </Modal>
  )
}

const KYCPromptContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;

  width: 480px;

  padding: 3rem 2.5rem;

  gap: 2rem;

  background: ${props => props.theme.launchpad.colors.background};
  border-radius: 8px;
`

const KYCPromptIconContainer = styled.div`
  display: grid;
  place-content: center;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 50%;

  width: 80px;
  height: 80px;
`

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const KYCLoadingIconContainer = styled(KYCPromptIconContainer)`
  animation: 2s ${rotate} linear infinite;
`

const KYCPromptTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  
  text-align: center;

  line-height: 29px;
  letter-spacing: -0.04em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const VerifyButton = styled(Link)`
  display: grid;

  place-content: center;

  height: 60px;
  width: 100%;

  text-align: center;
  text-decoration: none;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  line-height: 19px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.light};
  background: ${props => props.theme.launchpad.colors.primary};
  border-radius: 6px;
`

const ContactUsButton = styled.button`
  display: grid;

  place-content: center;

  height: 60px;
  width: 100%;

  text-align: center;
  text-decoration: none;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  line-height: 19px;
  letter-spacing: -0.02em;

  cursor: pointer;

  color: ${props => props.theme.launchpad.colors.text.light};
  background: ${props => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  border: none;
  outline: 0;
`

const Caption = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 11px;

  line-height: 150%;
  letter-spacing: -0.02em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.title};
  
  opacity: 0.6;
`

const ExitIconContainer = styled.div`
  position: absolute;

  top: 1rem;
  right: 1rem;
`
