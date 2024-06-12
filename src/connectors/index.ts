import type { MetaMask } from '@web3-react/metamask'
import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { Web3ReactHooks } from '@web3-react/core'

import { coinbaseWallet, hooks as coinbaseWalletHooks } from '../connectors/coinbaseWallet'
import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask'
import { hooks as walletConnectV2Hooks, walletConnectV2 } from '../connectors/walletConnectV2'
import { Connector } from '@web3-react/types'

export const connectors: [MetaMask | WalletConnectV2 | CoinbaseWallet, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnectV2, walletConnectV2Hooks],
  [coinbaseWallet, coinbaseWalletHooks],
]

export const tryDeactivateConnector = async (connector: Connector): Promise<null | undefined> => {
  if (connector?.deactivate) {
    void connector.deactivate()
  } else {
    void connector.resetState()
  }
  return null
}
