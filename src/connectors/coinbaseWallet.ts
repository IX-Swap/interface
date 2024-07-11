import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector } from '@web3-react/core'

import { URLS } from '../chains'

const IXS_DOMAIN = 'app.ixswap.io'
const POLYGON_CHAIN_ID = 137
const POLYGON_AMOY_CHAIN_ID = 80002

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: URLS[window.location.hostname === IXS_DOMAIN ? POLYGON_CHAIN_ID : POLYGON_AMOY_CHAIN_ID][0],
        appName: 'rwa',
      },
    })
)
