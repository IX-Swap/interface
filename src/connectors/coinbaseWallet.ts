import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector } from '@web3-react/core'

import { URLS } from '../chains'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { SupportedChainId } from 'constants/chains'

export const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: URLS[ENV_SUPPORTED_TGE_CHAINS ? ENV_SUPPORTED_TGE_CHAINS[0] : SupportedChainId.BASE][0],
        appName: 'rwa',
      },
    })
)
