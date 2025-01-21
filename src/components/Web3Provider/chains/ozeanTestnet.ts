import { defineChain } from 'viem'

// @ts-ignore
export const ozeanTestnet = defineChain({
  id: 7849306,
  name: 'Ozean Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'USDX',
    symbol: 'USDX',
  },
  rpcUrls: {
    default: {
      http: ['https://ozean-testnet.rpc.caldera.xyz/http'],
      webSocket: ['wss://ozean-testnet.rpc.caldera.xyz/ws'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://ozean-testnet.explorer.caldera.xyz' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 5882,
    },
  },
  testnet: true,
})

export default ozeanTestnet