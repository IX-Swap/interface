import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnect } from 'wagmi'
import { Text } from 'rebass'
import { Trans } from '@lingui/macro'

import { PinnedContentButton } from 'components/Button'
import { WalletEvent } from 'utils/event-logs'

import liff from '@line/liff'
import * as Sentry from '@sentry/react'

export default function CustomConnectButton() {
  const { connectors, connect } = useConnect()

  const handleClick = async () => {
    const resp = await liff.init({
      liffId: '2006732958-EAK9vggN', // Use own liffId
    })

    console.info('Resp', resp)
    console.log(liff.getAppLanguage())
    console.log(liff.getVersion())
    console.log('isInClient', liff.isInClient())
    console.log(liff.isLoggedIn())
    console.log(liff.getOS())
    console.log(liff.getLineVersion())

    const context = liff.getContext()
    console.info('context', context)
    console.info('isLoggedin', liff.isLoggedIn())
    // if (!liff.isLoggedIn()) {
    //   liff.login()
    // }

    Sentry.addBreadcrumb({
      category: 'liff',
      level: 'info',
      data: {
        resp: resp,
        appLanguage: liff.getAppLanguage(),
        version: liff.getVersion(),
        isInClient: liff.isInClient(),
        isLoggedIn: liff.isLoggedIn(),
        os: liff.getOS(),
        LineVersion: liff.getLineVersion(),
      },
    })

    Sentry.captureMessage(`Connecting to LINE`)
    const passkeyConnector = connectors.find((connector) => connector.id === 'linenextWallet')

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
