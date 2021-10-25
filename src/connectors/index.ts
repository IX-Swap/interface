import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
// import { PortisConnector } from '@web3-react/portis-connector'
// import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'
import IXSWAP_LOGO_URL from '../assets/svg/logo.svg'
import getLibrary from '../utils/getLibrary'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

const NETWORK_URLS: {
  [chainId: number]: string
} = {
  [1]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [4]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [3]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  [5]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [42]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  [80001]: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
  [137]: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
}

const SUPPORTED_CHAIN_IDS = [1, 4, 3, 42, 5, 80001, 137]

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: 1,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})

export const walletconnect = new WalletConnectConnector({
  rpc: NETWORK_URLS,
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org',
  pollingInterval: 12000,
})

// mainnet only
// export const fortmatic = new FortmaticConnector({
//   apiKey: '',
//   chainId: 1,
// })

// mainnet only
// export const portis = new PortisConnector({
//   dAppId: '',
//   networks: [1],
// })

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URLS[1],
  appName: 'IX Swap',
  appLogoUrl: IXSWAP_LOGO_URL,
})
