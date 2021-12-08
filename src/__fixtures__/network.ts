import { Network } from 'types/networks'

export const network: Network = {
  nativeCurrency: {
    name: 'Ropsten Ether',
    symbol: 'ETH',
    decimals: 18
  },
  explorer: {
    urls: {
      home: 'https://ropsten.etherscan.io/',
      transaction: 'https://ropsten.etherscan.io/tx/%s',
      address: 'https://ropsten.etherscan.io/address/%s',
      token: 'https://ropsten.etherscan.io/token/%s'
    },
    name: 'Etherscan for Rospten',
    description:
      'Etherscan is the leading BlockChain Explorer, Search, API and Analytics Platform for Ethereum, a decentralized smart contracts platform.'
  },
  supportsEvm: true,
  hasUTXO: false,
  _id: '5f88035d7ae447ee9274d4fa',
  name: 'Ropsten Test Network (Public Ethereum)',
  chainId: 3,
  createdAt: '2020-10-15T08:07:57.264Z',
  isSandbox: true,
  networkId: 3,
  nodes: [
    {
      _id: '5f88035d6709c90de75b1e9f',
      name: 'Infura Provider for Ropsten',
      description:
        "Infura is a hosted Ethereum node cluster that lets your users run your application without requiring them to set up their own Ethereum node or wallet. You may not be familiar with Infura by name, but if you've used MetaMask then you've used Infura, as it is the Ethereum provider that powers MetaMask.",
      url: 'https://infura.io/',
      endpoint: 'https://ropsten.infura.io/v3/aa62950f7d3942ec9a6b46a7586d0f35',
      params: [
        {
          _id: '5f88035d6709c90de75b1ea0',
          key: null,
          value: null
        }
      ],
      headers: [
        {
          _id: '5f88035d6709c90de75b1ea1',
          key: null,
          value: null
        }
      ],
      user: null,
      password: null,
      meta: {
        secretUserAgent: 'InvestaX Blockchain Services v0.1',
        projectId: 'aa62950f7d3942ec9a6b46a7586d0f35',
        projectSecret: 'c44d27f2d3954bfbb4545a9aa8608746',
        bearer: ''
      }
    }
  ],
  updatedAt: '2020-10-15T08:07:57.264Z'
}

const algorandNetwork: Network = {
  nativeCurrency: {
    name: 'Algorand',
    symbol: 'ALGO',
    decimals: 0
  },
  explorer: {
    urls: {
      home: 'https://goalseeker.purestake.io',
      transaction:
        'https://goalseeker.purestake.io/algorand/testnet/transaction/%s',
      address: 'https://goalseeker.purestake.io/algorand/testnet/account/%s',
      token: 'https://goalseeker.purestake.io/algorand/testnet/search/%s'
    },
    name: 'Goalseeker for algorand',
    description:
      'Goalseeker is the leading BlockChain Explorer, Search, API and Analytics Platform for Algorand, a decentralized smart contracts platform.'
  },
  supportsEvm: true,
  hasUTXO: false,
  _id: '611a2458c8f34bf9cc34589c',
  name: 'ALGOD V2.2.0 TESTNET',
  chainId: 6,
  createdAt: '2021-08-16T08:39:52.372Z',
  isSandbox: true,
  networkCode: 'ALGO_TESTNET',
  networkId: 6,
  nodes: [],
  updatedAt: '2021-08-16T08:39:52.372Z'
}

export const networks: Network[] = [
  network,
  {
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    explorer: {
      urls: {
        home: 'https://etherscan.io/',
        transaction: 'https://etherscan.io/tx/%s',
        address: 'https://etherscan.io/address/%s',
        token: 'https://etherscan.io/token/%s'
      },
      name: 'Etherscan for Rospten',
      description:
        'Etherscan is the leading BlockChain Explorer, Search, API and Analytics Platform for Ethereum, a decentralized smart contracts platform.'
    },
    supportsEvm: true,
    hasUTXO: false,
    _id: '5f88035d7ae447ee9274d4fb',
    name: 'Main Ethereum Network',
    chainId: 1,
    createdAt: '2020-10-15T08:07:57.264Z',
    isSandbox: true,
    networkId: 1,
    nodes: [
      {
        _id: '5f88035d6709c90de75b1ea2',
        name: 'Infura Provider for Ethereum Mainnet',
        description:
          "Infura is a hosted Ethereum node cluster that lets your users run your application without requiring them to set up their own Ethereum node or wallet. You may not be familiar with Infura by name, but if you've used MetaMask then you've used Infura, as it is the Ethereum provider that powers MetaMask.",
        url: 'https://infura.io/',
        endpoint:
          'https://mainnet.infura.io/v3/aa62950f7d3942ec9a6b46a7586d0f35',
        params: [
          {
            _id: '5f88035d6709c90de75b1ea3',
            key: null,
            value: null
          }
        ],
        headers: [
          {
            _id: '5f88035d6709c90de75b1ea4',
            key: null,
            value: null
          }
        ],
        user: null,
        password: null,
        meta: {
          secretUserAgent: 'InvestaX Blockchain Services v0.1',
          projectId: 'aa62950f7d3942ec9a6b46a7586d0f35',
          projectSecret: 'c44d27f2d3954bfbb4545a9aa8608746',
          bearer: ''
        }
      }
    ],
    updatedAt: '2020-10-15T08:07:57.264Z'
  },
  algorandNetwork
]
