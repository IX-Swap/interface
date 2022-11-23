import React from 'react'
import styled, { keyframes, useTheme } from 'styled-components'

import { useWeb3React } from '@web3-react/core'

import { Link } from 'react-router-dom'

import { PromptFooter } from './PromptFooter'

import { ReactComponent as KYCPromptIcon } from 'assets/launchpad/svg/kyc-prompt-icon.svg'
import { ReactComponent as Loading } from 'assets/launchpad/svg/loader.svg'
import { ReactComponent as ErrorIcon } from 'assets/launchpad/svg/error-icon.svg'
import { ReactComponent as CrossIcon } from 'assets/launchpad/svg/close.svg'


import Modal from 'components/Modal'

import { useKYCState } from 'state/kyc/hooks'

import { KYCStatuses } from 'pages/KYC/enum'

import { ContactForm } from './ContactForm'
import { ConnectionDialog } from '../Wallet/ConnectionDialog'
import { Caption, KYCButton, KYCPromptContainer, KYCPromptIconContainer, KYCPromptTitle } from './styled'

interface Props {
  offerId: string
  allowOnlyAccredited: boolean
}

export const KYCPrompt: React.FC<Props> = (props) => {
  const theme = useTheme()

  const { account } = useWeb3React()
  const { kyc } = useKYCState()

  const [isOpen, setIsOpen] = React.useState(true)
  const toggleModal = React.useCallback((isOpen?: boolean) => setIsOpen(state => isOpen ?? !state), [])

  const [contactFormOpen, setContactForm] = React.useState(false)

  const toggleContactForm = React.useCallback(() => setContactForm(state => !state), [])

  const showFooter = React.useMemo(() => !contactFormOpen && 
      (!kyc || [KYCStatuses.NOT_SUBMITTED, KYCStatuses.PENDING, KYCStatuses.IN_PROGRESS, KYCStatuses.CHANGES_REQUESTED].includes(kyc.status)), 
    [kyc])

  return (
    <Modal isOpen={isOpen} onDismiss={() => toggleModal(false)}>
      {!account && <ConnectionDialog onConnect={() => toggleModal(true)} onClose={() => toggleModal(false)} />}

      {account && (
        <KYCPromptContainer>
          <ExitIconContainer onClick={() => toggleModal(false)}>
            <CrossIcon />
          </ExitIconContainer>

          {!contactFormOpen && (
            <>
              {(!kyc) && (
                <>
                  <KYCPromptIconContainer>
                    <KYCPromptIcon />
                  </KYCPromptIconContainer>

                  <KYCPromptTitle>
                    Verify your account to use the  IXS Launchpad
                  </KYCPromptTitle>

                  <VerifyButton to="/kyc">
                    Verify Account
                  </VerifyButton>
                </>
              )}
              {(kyc && kyc.status === KYCStatuses.CHANGES_REQUESTED) && (
                <>
                  <KYCLoadingIconContainer>
                    <Loading />
                  </KYCLoadingIconContainer>

                  <KYCPromptTitle>
                    We have requested an update to your account verification process.
                  </KYCPromptTitle>

                  <VerifyButton to="/kyc">
                    Update
                  </VerifyButton>
                </>
              )}

              {kyc && [KYCStatuses.PENDING, KYCStatuses.IN_PROGRESS].includes(kyc.status)  && (
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
                  
                  <KYCButton type="button" onClick={() => toggleModal()}>
                    Close
                  </KYCButton>
                </>
              )}

              {kyc && kyc.status === KYCStatuses.REJECTED && (
                <>
                  <KYCPromptIconContainer>
                    <ErrorIcon />
                  </KYCPromptIconContainer>
                  
                  <KYCPromptTitle>
                    Account verification was unsuccessful.
                    Therefore, you are not able to use the IXS Launchpad. 
                    Please try again or contact us for more information.
                  </KYCPromptTitle>

                  <VerifyButton to="/kyc">
                    Try Again
                  </VerifyButton>

                  <Caption>
                    Account verification is a one-time process.
                  </Caption>

                  <ContactUsTextButton type="button" onClick={toggleContactForm}>
                    Contact us
                  </ContactUsTextButton>
                </>
              )}

              {showFooter && <PromptFooter />}
            </>
          )}

          {contactFormOpen && <ContactForm onSubmit={() => toggleModal(false)} />}
        </KYCPromptContainer>
      )}
    </Modal>
  )
}


const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const KYCLoadingIconContainer = styled(KYCPromptIconContainer)`
  animation: 2s ${rotate} linear infinite;
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

const ContactUsTextButton = styled.button`
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

  color: ${props => props.theme.launchpad.colors.primary};
  background: ${props => props.theme.launchpad.colors.text.light};
  border-radius: 6px;
  border: none;
  outline: 0;
`

const ExitIconContainer = styled.div`
  position: absolute;

  top: 1rem;
  right: 1rem;

  cursor: pointer;

  svg {
    fill: ${props => props.theme.launchpad.colors.text.body};
  }
`
