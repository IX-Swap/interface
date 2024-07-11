import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { MAINNET_CHAINS, TESTNET_CHAINS } from '../chains'

const IXS_DOMAINS = ['app.ixswap.io', 'readi.ixswap.io']
const POLYGON_CHAIN_ID = 137
const POLYGON_AMOY_CHAIN_ID = 80002
/* eslint-disable react/display-name */

const chains = Object.keys(MAINNET_CHAINS).concat(Object.keys(TESTNET_CHAINS)).map(Number)

export const [walletConnectV2, hooks] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || 'ba0a3724b8cab7c0db373ed9bf3a7f09',
        chains: [IXS_DOMAINS.includes(window.location.hostname) ? POLYGON_CHAIN_ID : POLYGON_AMOY_CHAIN_ID],
        optionalChains: chains,
        showQrModal: true,
      },
    })
)
