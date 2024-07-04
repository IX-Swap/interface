import { initializeConnector } from '@web3-react/core'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'

import { MAINNET_CHAINS, TESTNET_CHAINS } from '../chains'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'

const chains = Object.keys(MAINNET_CHAINS).concat(Object.keys(TESTNET_CHAINS)).map(Number)

export const [walletConnectV2, hooks] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || 'ba0a3724b8cab7c0db373ed9bf3a7f09',
        chains: ENV_SUPPORTED_TGE_CHAINS,
        optionalChains: chains,
        showQrModal: true,
      },
    })
)
