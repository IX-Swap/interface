import { baseSepolia, base, mainnet, polygon, polygonAmoy, Chain } from 'wagmi/chains'
import { fallback, http } from 'wagmi'
import { Transport } from 'viem'

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

export const CHAINS: [Chain, ...Chain[]] = [baseSepolia, base, mainnet, polygon, polygonAmoy]

export const CLIENT_CONFIG = {
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
}

const PUBLIC_MAINNET = 'https://ethereum.publicnode.com'

export const PUBLIC_NODES = {
  [ChainId.Mainnet]: [getAlchemyUrlFor('eth-mainnet'), 'https://cloudflare-eth.com'].filter(Boolean),
  [ChainId.Polygon]: [getAlchemyUrlFor('polygon-mainnet'), 'https://polygon-rpc.com'].filter(Boolean),
  [ChainId.Amoy]: [getAlchemyUrlFor('polygon-amoy'), 'https://rpc-amoy.polygon.technology/'].filter(Boolean),
  [ChainId.Base]: [getAlchemyUrlFor('base-mainnet'), 'https://basechain.infura.io'],
  [ChainId.BaseSepolia]: [getAlchemyUrlFor('base-sepolia'), 'https://sepolia.basechain.infura.io'],
} as any

export const transports = CHAINS.reduce((ts, chain) => {
  let httpStrings: string[] | readonly string[] = []

  if (process.env.NODE_ENV === 'test' && chain.id === mainnet.id) {
    httpStrings = [PUBLIC_MAINNET]
  } else {
    httpStrings = PUBLIC_NODES[chain.id] ? PUBLIC_NODES[chain.id] : []
  }

  if (ts) {
    return {
      ...ts,
      [chain.id]: fallback(httpStrings.map((t: any) => http(t))),
    }
  }

  return {
    [chain.id]: fallback(httpStrings.map((t: any) => http(t))),
  }
}, {} as Record<number, Transport>)
