import React from 'react'
import styled from 'styled-components'

import Modal from 'components/Modal'

import { ConnectionDialog } from './ConnectionDialog'


interface Props {
  onConnect: () => void
}

export const ConnectPrompt: React.FC<Props> = (props: Props) => {
  const [showConnectModal, setShowConnectModal] = React.useState(false)

  const toggleModal = React.useCallback(() => setShowConnectModal(state => !state), [])

  return (
    <>
      <ConnectButton onClick={toggleModal}>
        <span className="title">Connect Wallet</span> <br />
        <span className="subtitle">Sign-up/Login</span>
      </ConnectButton>

      <Modal isOpen={showConnectModal} onDismiss={toggleModal} maxWidth="430px" maxHeight="310px">
        <ConnectionDialog onConnect={props.onConnect} />
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

  cursor: pointer;

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
