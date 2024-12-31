import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnect } from 'wagmi'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'

import { PinnedContentButton } from 'components/Button'
import { WalletEvent } from 'utils/event-logs'

export default function CustomConnectButton() {
  const { connectors, connect } = useConnect()

  const handleClick = async () => {
    const passkeyConnector = connectors.find((connector) => connector.id === 'linenextWallet')

    localStorage.clear()
    console.info('PassKeyConnector', passkeyConnector)

    try {
      console.info('passkeyconnector', passkeyConnector)
      new WalletEvent('Connecting line liff ').walletAddress('unknonw').info('Prepare to connect')
      connect({ connector: passkeyConnector as any })
    } catch (err: any) {
      new WalletEvent('Connecting line liff error').walletAddress('unknonw').error(err.toString())
    }
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted }) => {
        const ready = mounted
        const connected = ready && account && chain

        // TODO: Define based on your own criteria.
        // Check out the "Detecting Other Wallets" recipe for an example.
        const isNormieVisitor = true

        return (
          <div>
            {(() => {
              if (!connected && isNormieVisitor) {
                return (
                  <PinnedContentButton style={{ boxShadow: '0px 16px 16px 0px #6666FF21' }} onClick={handleClick}>
                    <Text className="connect-wallet-button">
                      <Trans>Connect Kaia Dapp portal Wallet</Trans>
                    </Text>
                  </PinnedContentButton>
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
