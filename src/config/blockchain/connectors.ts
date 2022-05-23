import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from './NetworkConnector'
import getLibrary from './getLibrary'

// use the right one asap
const INFURA_KEY = '7f00ea5349e64a078e7a9533c9126cef'

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

const NETWORK_URLS: {
  [chainId: number]: string
} = {
  1: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  4: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  3: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  5: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  42: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  80001: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
  137: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`
}

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const injected = new InjectedConnector({})
