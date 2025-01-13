import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnect } from 'wagmi'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'

import * as Sentry from '@sentry/react'
import { LineButton } from './LineLiffModal'
import LineNextIcon from 'assets/images/linenext-logo.png'

interface LineLiffConnectButtonProps {
  text?: string
  onClose?: () => void
}

export const LineLiffConnectButton: React.FC<LineLiffConnectButtonProps> = ({
  text = 'Connect',
  onClose = function () {},
}) => {
  const { connectors, connect } = useConnect()

  const handleClick = async () => {
    Sentry.captureMessage(`Connecting to LINE`)
    const connector = connectors.find((connector) => connector.id === 'linenextWallet')
    connect({ connector: connector as any })
    onClose()
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div>
            {(() => {
              if (!connected) {
                return (
                  <LineButton
                    style={{ boxShadow: '0px 16px 16px 0px #6666FF21', marginBottom: '20px' }}
                    onClick={handleClick}
                  >
                    <img src={LineNextIcon} alt="line-next-icon" />
                    <Text className="connect-wallet-button">
                      <Trans>{text}</Trans>
                    </Text>
                  </LineButton>
                )
              }

              // Default <ConnectButton> fallback.
              return <ConnectButton />
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
