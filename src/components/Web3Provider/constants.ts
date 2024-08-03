import { baseSepolia, base, mainnet, polygon, polygonAmoy,  Chain as WagmiChain } from 'wagmi/chains'

import GNOSIS_ICON from 'assets/wallets/gnosis.png'
import COINBASE_ICON from 'assets/wallets/coinbase-icon.svg'
import METAMASK_ICON from 'assets/wallets/metamask-icon.svg'
import WALLET_CONNECT_ICON from 'assets/wallets/walletconnect-icon.svg'
import { atomWithStorage, useAtomValue } from 'jotai/utils'
import { ChainId } from 'types/chains'

export const CONNECTION = {
  WALLET_CONNECT_CONNECTOR_ID: 'walletConnect',
  INJECTED_CONNECTOR_ID: 'injected',
  INJECTED_CONNECTOR_TYPE: 'injected',
  COINBASE_SDK_CONNECTOR_ID: 'coinbaseWalletSDK',
  COINBASE_RDNS: 'com.coinbase.wallet',
  METAMASK_RDNS: 'io.metamask',
  UNISWAP_EXTENSION_RDNS: 'org.uniswap.app',
  SAFE_CONNECTOR_ID: 'safe',
} as const

export const CONNECTOR_ICON_OVERRIDE_MAP: { [id in string]?: string } = {
  [CONNECTION.METAMASK_RDNS]: METAMASK_ICON,
  [CONNECTION.COINBASE_SDK_CONNECTOR_ID]: COINBASE_ICON,
  [CONNECTION.WALLET_CONNECT_CONNECTOR_ID]: WALLET_CONNECT_ICON,
  [CONNECTION.SAFE_CONNECTOR_ID]: GNOSIS_ICON,
}

// Used to track which connector was used most recently for UI states.
export const recentConnectorIdAtom = atomWithStorage<string | undefined>('recentConnectorId', undefined)
export function useRecentConnectorId() {
  return useAtomValue(recentConnectorIdAtom)
}

const getAlchemyUrlFor = (network: string) =>
  process.env.REACT_APP_ALCHEMY_KEY ? `https://${network}.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}` : ''

export const WAGMI_CHAIN_INFO: Record<ChainId, WagmiChain> = {
  [ChainId.Mainnet]: {
    ...mainnet,
    rpcUrls: {
      default: {
        http: [getAlchemyUrlFor('eth-mainnet'), 'https://cloudflare-eth.com'],
      },
    },
  },
  [ChainId.Base]: {
    ...base,
    rpcUrls: {
      default: {
        http: [getAlchemyUrlFor('base-mainnet'), 'https://mainnet.base.org'],
      },
    },
  },
  [ChainId.Polygon]: {
    ...polygon,
    rpcUrls: {
      default: {
        http: [getAlchemyUrlFor('polygon-mainnet'), 'https://polygon-rpc.com'],
      },
    },
  },
  [ChainId.Amoy]: {
    ...polygonAmoy,
    rpcUrls: {
      default: {
        http: [getAlchemyUrlFor('polygon-amoy'), 'https://rpc-amoy.polygon.technology'],
      },
    },
  },
  [ChainId.BaseSepolia]: {
    ...baseSepolia,
    rpcUrls: {
      default: {
        http: [getAlchemyUrlFor('base-sepolia'), 'https://sepolia.base.org'],
      },
    },
  },
} as any;
