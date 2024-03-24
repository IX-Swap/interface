// @ts-nocheck
import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector } from '@web3-react/core'

import { URLS } from '../chains'

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: URLS[1],
        appName: 'ixs',
      },
      onError: (error) => {
        console.warn('ERR_COINBASE_WALLET', error)
        // useWeb3ConnectStore.setState({ error })
      },
    })
)
