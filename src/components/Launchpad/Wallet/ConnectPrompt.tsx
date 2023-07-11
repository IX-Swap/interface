import React from 'react'
import styled from 'styled-components'

import Modal from 'components/Modal'

import { ConnectionDialog } from './ConnectionDialog'
import { text1, text15 } from 'components/LaunchpadMisc/typography'

interface Props {
  onConnect: () => void
}

export const ConnectPrompt: React.FC<Props> = (props: Props) => {
  const [showConnectModal, setShowConnectModal] = React.useState(false)

  const toggleModal = React.useCallback(() => setShowConnectModal((state) => !state), [])

  return (
    <>
      <ConnectButton onClick={toggleModal}>
        <span className="title">Connect Wallet</span> <br />
        <span className="subtitle">Sign-up/Login</span>
      </ConnectButton>

      <Modal isOpen={showConnectModal} onDismiss={toggleModal} maxWidth="430px" maxHeight="310px">
        <ConnectionDialog onConnect={props.onConnect} onClose={toggleModal} />
      </Modal>
    </>
  )
}

const ConnectButton = styled.button`
  background: ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  border: none;
  height: 48px;
  padding: 0 3rem;
  text-align: center;
  cursor: pointer;

  .title {
    ${text1}

    color: ${(props) => props.theme.launchpad.colors.text.light};
  }

  .subtitle {
    ${text15}
    color: rgba(255, 255, 255, 0.6);
  }
`
