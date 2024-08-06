import React from 'react'
import styled from 'styled-components'
import { useConnectModal } from '@rainbow-me/rainbowkit'

import { text1, text15 } from 'components/LaunchpadMisc/typography'

interface Props {
  onConnect: () => void
}

export const ConnectPrompt: React.FC<Props> = (props: Props) => {
  const { openConnectModal } = useConnectModal()

  return (
    <>
      <ConnectButton onClick={openConnectModal}>
        <span className="title">Connect Wallet</span> <br />
        <span className="subtitle">Sign-up/Login</span>
      </ConnectButton>
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
