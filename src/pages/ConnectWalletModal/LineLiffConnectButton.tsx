import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnect } from 'wagmi'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'

import { useAuthState, useLogin } from 'state/auth/hooks'
import { useAccount } from 'state/user/hooks'
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
  const { connectors, connectAsync } = useConnect()

  const { token } = useAuthState()
  const { authenticate } = useAccount()

  const login = useLogin({ mustHavePreviousLogin: true })

  const handleClick = async () => {
    Sentry.captureMessage(`Connecting to LINE`)
    const connector = connectors.find((connector) => connector.id === 'linenextWallet')
    await connectAsync({ connector: connector as any })
    console.info('TOIKEN', token)
    if (!token) {
      const status = await login(true)
    }
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
