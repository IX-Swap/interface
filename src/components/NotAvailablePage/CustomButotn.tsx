import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useConnect} from 'wagmi'
import {Text} from 'rebass'
import {Trans} from '@lingui/macro'

import {PinnedContentButton} from 'components/Button'
import {WalletEvent} from 'utils/event-logs'

import DappPortalSDK from '@linenext/dapp-portal-sdk'
import liff from '@line/liff'
import * as Sentry from '@sentry/react'

export default function CustomConnectButton() {
  const {connectors, connect} = useConnect()

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

    const sdk = await DappPortalSDK.init({
      clientId: 'bab621cd-1d1e-45ef-8b42-c2b0917c645a',
      chainId: '1001',
    })

    const provider = sdk.getWalletProvider()

    const accounts = (await provider.request({method: 'kaia_requestAccounts'})) as string[]

    console.log("accounts", accounts)

    try {
      new WalletEvent('Connecting line liff ').walletAddress('unknonw').info('Prepare to connect')
    } catch (err: any) {
      new WalletEvent('Connecting line liff error').walletAddress('unknonw').error(err.toString())
    }
  }

  return (
    <ConnectButton.Custom>
      {({account, chain, mounted}) => {
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
                  <PinnedContentButton style={{boxShadow: '0px 16px 16px 0px #6666FF21'}} onClick={handleClick}>
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
