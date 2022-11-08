import React from 'react'
import styled from 'styled-components'

import Modal from 'components/Modal'

import { ConnectionOptions } from './ConnectionOptions'


export const ConnectPrompt = () => {
  const [showConnectModal, setShowConnectModal] = React.useState(false)
  const toggleModal = React.useCallback(() => setShowConnectModal(state => !state), [])

  return (
    <>
      <ConnectButton onClick={toggleModal}>
        <span className="title">Connect Wallet</span> <br />
        <span className="subtitle">Sign-up/Login</span>
      </ConnectButton>

      <Modal isOpen={showConnectModal} onDismiss={toggleModal} maxWidth="430px" maxHeight="310px">
        <ModalContainer>
          <PromptTitle>Connect Wallet </PromptTitle>

          <ConnectionOptions />

          <AgreementNotice>
            By connecting a wallet, you agree to IX Swap’s <a>Terms and Conditions</a> and 
            acknowledge that you have read and understood the IX Swap Privacy Policy.
          </AgreementNotice>
        </ModalContainer>
      </Modal>
    </>
  )
}


const ConnectButton = styled.button`
  background: ${props => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  border: none;

  padding: 0.5rem 3rem;

  text-align: center;

  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;

    line-height: 16px;
    letter-spacing: -0.02em;

    color: ${props => props.theme.launchpad.colors.text.light};
  }

  .subtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;

    line-height: 12px;
    letter-spacing: -0.02em;

    color: rgba(255, 255, 255, 0.6);
  }
`

const ModalContainer = styled.div`
  background: ${props => props.theme.launchpad.colors.background};
  border-radius: 10px;

  padding: 2rem 4rem;
`

const PromptTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  
  text-align: center;

  line-height: 24px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const AgreementNotice = styled.div`
  background: ${props => props.theme.launchpad.colors.accent};
  color: rgba(102, 102, 255, 0.7);

  border-radius: 6px;
  border: 1px solid rgba(102, 102, 255, 0.3);

  padding: 1rem;

  font-style: normal;
  font-weight: 500;
  font-size: 11px;

  line-height: 13px;
  letter-spacing: -0.02em;

  a {
    text-decoration: underline;
  }
`