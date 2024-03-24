import type { MetaMask } from '@web3-react/metamask'
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { Web3ReactHooks } from '@web3-react/core'

import { hooks as metaMaskHooks, metaMask } from '../connectors/metaMask'
import { hooks as walletConnectV2Hooks, walletConnectV2 } from '../connectors/walletConnectV2'
import { hooks as coinbaseHooks, coinbaseWallet } from '../connectors/coinbase'

export const connectors: [MetaMask | WalletConnectV2, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnectV2, walletConnectV2Hooks],
  [coinbaseWallet as any, coinbaseHooks],
]

