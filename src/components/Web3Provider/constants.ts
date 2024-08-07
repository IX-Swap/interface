import { baseSepolia, base, mainnet, polygon, polygonAmoy, Chain } from 'wagmi/chains'
import { fallback, http } from 'wagmi'
import { Transport } from 'viem'

import { ChainId } from 'types/chains'

const getAlchemyUrlFor = (network: string) =>
  process.env.REACT_APP_ALCHEMY_KEY ? `https://${network}.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}` : ''

export const CHAINS: [Chain, ...Chain[]] = [baseSepolia, base, mainnet, polygon, polygonAmoy]

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
}, {} as Record<number, Transport>) as any
