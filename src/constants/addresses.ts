import { FACTORY_ADDRESS } from '@ixswap1/v2-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'
import { isProd } from 'utils/isEnvMode'

type ContractAddressRecord = Record<number, string>

export const MULTICALL2_ADDRESSES = {
  [1]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [4]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [3]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [5]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [42]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [80001]: '0xBC3B2826B3968a877C82D274A0389c16fBBcc742',
  [80002]: '0x099c0EBa98713231f2585F1dD7DCB01e6a1e0DD1',
  [137]: '0x65Eed76951B6660bb0b80AF8D8A3AC6b10C6e65F',
  [84532]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  [8453]: '0xcA11bde05977b3631167028862bE2a173976CA11',
}
export const NFT_ADDRESS = {
  [1]: '',
  [4]: '0x6ECc7A1dCe9DD04A18a03bf0a537E9F77cd194fA',
  [3]: '',
  [5]: '',
  [42]: '0x4DB7dc4bDc3848F4E948A8a8bB31a9d2021D05a6',
  [80001]: '',
  [80002]: '',
  [137]: '',
  [84532]: '',
}

// export const ENV_SUPPORTED_TGE_CHAINS = [1, 42, 137] as number[] | undefined

export const ENV_SUPPORTED_TGE_CHAINS = (
  process.env.REACT_APP_SUPPORTED_TGE_CHAINS ? JSON.parse(process.env.REACT_APP_SUPPORTED_TGE_CHAINS) : [SupportedChainId.BASE]
) as number[]

export const SUPPORTED_TGE_CHAINS = {
  MAIN: 1,
  KOVAN: 42,
  MATIC: 137,
  MUMBAI: 80001,
  AMOY: 80002,
  RINKEBY: 4,
  BASE_SEPOLIA: 84532,
  BASE: 8453,
}

export const TGE_CHAINS_WITH_SWAP = ENV_SUPPORTED_TGE_CHAINS || [
  SUPPORTED_TGE_CHAINS.AMOY,
  SUPPORTED_TGE_CHAINS.MATIC,
  SUPPORTED_TGE_CHAINS.BASE,
  SUPPORTED_TGE_CHAINS.BASE_SEPOLIA,
]
export const TGE_CHAINS_WITH_STAKING = ENV_SUPPORTED_TGE_CHAINS || [
  SUPPORTED_TGE_CHAINS.AMOY,
  SUPPORTED_TGE_CHAINS.MATIC,
  SUPPORTED_TGE_CHAINS.BASE,
  SUPPORTED_TGE_CHAINS.BASE_SEPOLIA,
]
export const ETHEREUM_TGE_CHAINS = [SUPPORTED_TGE_CHAINS.KOVAN, SUPPORTED_TGE_CHAINS.MAIN]
export const MATIC_TGE_CHAINS = [SUPPORTED_TGE_CHAINS.MATIC, SUPPORTED_TGE_CHAINS.AMOY]
export const BASE_TGE_CHAINS = [SUPPORTED_TGE_CHAINS.BASE, SUPPORTED_TGE_CHAINS.BASE_SEPOLIA]
export const MAIN_TGE_CHAINS = [SUPPORTED_TGE_CHAINS.MAIN, SUPPORTED_TGE_CHAINS.MATIC]
export const CREATE_TOKEN_CHAINS = ENV_SUPPORTED_TGE_CHAINS || [
  SUPPORTED_TGE_CHAINS.AMOY,
  SUPPORTED_TGE_CHAINS.MATIC,
  SUPPORTED_TGE_CHAINS.BASE,
  SUPPORTED_TGE_CHAINS.BASE_SEPOLIA,
]
export const TGE_CHAINS_WITH_KYC = ENV_SUPPORTED_TGE_CHAINS || [
  SUPPORTED_TGE_CHAINS.AMOY,
  SUPPORTED_TGE_CHAINS.MATIC,
  SUPPORTED_TGE_CHAINS.BASE,
  SUPPORTED_TGE_CHAINS.BASE_SEPOLIA,
]
// the rest are same as kovan for now
export const IXS_ADDRESS: { [key: number]: string } = {
  [1]: '0x73d7c860998CA3c01Ce8c808F5577d94d545d1b4',
  [4]: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2',
  [3]: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2',
  [5]: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2',
  [42]: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2',
  [80001]: '0x3Dc2aA62a4bF480b92b09AB4fCD989c4e7b63E1b',
  [80002]: '0x30fada52969974d31f2738e7a890334266636d40',
  [137]: '0x1ba17c639bdaecd8dc4aac37df062d17ee43a1b8',
  [84532]: '0x949546713004ee02537292b1F41046f705909191',
  [8453]: isProd ? '0x7913B2F933911c4FCf29DA62DB0Db2CF3CdEA894' : '0xb473dc4C4B7d51247c01F07A9dCB7f947D9F9389', // TODO: update address for base chain
}

export const IXS_GOVERNANCE_ADDRESS: { [key: number]: string } = {
  [1]: '0xf65dd1B5dE5655B56Ae8beAE49Bb2bCb95B1F20c',
  [42]: '0xB1519Ffe2761Eb68C11F53eBb550f71C4E04C35F',
  [80001]: '0x7eE23bF4246e9923D1f923066214afEDe60B1d5C',
  [137]: '0xe09910d2DA99Bad626f3747E0621Df7C4aEE1465',
}
export const IXS_VESTING_ADDRESS: { [key: number]: string } = {
  [1]: '0x7e6A90091a77bcd49D48C412A54087981f915F7c',
  [42]: '0xF7B268D0CB98b67F22825547D6fB4631e7bb0F6a',
  [80001]: '0x022D8C0F8FE5Ad204A59a755D5D45Ea22bfc6200',
  [137]: '0xf17726FbE0be89977bDa39EA1D11B3fc7E17d86C',
}
// IXS Token staking V1 (post TGE) address
export const IXS_STAKING_V1_ADDRESS: { [key: number]: string } = {
  [1]: '0x13Ca6Daab84af2A452f86Ea437bb90c6217a220c',
  [42]: '0x2ddCfC409Ba3116d8d0a2224FfDF30042686eDe8',
  [80001]: '0x2274FAE295FA3Fa87777E3A73Cb30D64dbb20685',
  [137]: '0xad644F3cC768bc6dceF97096790e2210D5191cec',
}
export const SWAP_ROUTER_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '0x1b44F01C0abEd5C4dF8b55B2d33cEf46b0CAcc95',
  [80001]: '0x2182cbd3911183aEBDd334AdaA7F2e41bB14A124',
  [80002]: '0x84bb01821Bec8173be51bab99dDEB4123496304c',
  [137]: isProd ? '0x72f54BEbabE8A26794B8BFeA832b65B7Bd88da37' : '0x202144b6723E5000318B9Ac6e309617D98Ce2A4e',
  [84532]: '0x58AeF810462eF25A38d4842afE7241687cbaB007',
  [8453]: isProd ? '' : '0x63689b716a25c01a5d02cBC50bD8d20b86405e4d', // TODO: add base chain
}

export const LIQUIDITY_ROUTER_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '0xC4D56138b73D53Ff55313FC251053B735BA1cfA1',
  [80001]: '0x84bb01821Bec8173be51bab99dDEB4123496304c',
  [80002]: '0x3390cDAfb5a6E5a9407BF7AAB98C24669b70ee4E',
  [137]: isProd ? '0x342172484664093B1F15Eb10B91721ba3e3DC97A' : '0x6c2D04F9567794988B569648169e338b85780818',
  [84532]: '0xee8e537bdD14D9170396dDAf91dC2537e59eD040',
  [8453]: isProd ? '' : '0xbA408B6a76068Cdd66EEC0432Fd4105C15eced90', // TODO: add base chain
}
export const V2_CORE_FACTORY_ADDRESSES = constructSameAddressMap(FACTORY_ADDRESS as string)
export const ARGENT_WALLET_DETECTOR_ADDRESS: { [chainId: number]: string } = {
  [1]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const ENS_REGISTRAR_ADDRESSES = {
  [1]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [5]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [4]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [3]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}

export const FACTORY_ROUTER_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '0x4983b160a8E0De9Cf6a055bd8750847DE3E14eE6',
  [80001]: '0xF8E10Dc0BEf764E0889F539b58fbDA00f7d9a2FD',
  [80002]: '0xA9f8EB060f36ECa31a05C3920A78883f7F650312',
  [137]: isProd ? '0xc2D0e0bc81494adB71Ce9Aa350cC875DaE12D81D' : '0x6b6Bf0d95b2Bb39e225968E831Ec700337763846',
  [84532]: '0x9aA5f0Fab0D7F13ff528a0d637DE343cf23A0218',
  [8453]: isProd ? '' : '0x51CC508F1f4569073de51fe0Ef473E5E4E9BcdC0', // TODO: add base chain
}

export const IXSALE_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '',
  [80001]: process.env.REACT_APP_IXSALE_ADDRESS_MUMBAI || '',
  [80002]: process.env.REACT_APP_IXSALE_ADDRESS_AMOY || '',
  [137]: process.env.REACT_APP_IXSALE_ADDRESS_POLYGON || '',
  [84532]: process.env.REACT_APP_IXSALE_ADDRESS_BASE_SEPOLIA || '',
  [8453]: process.env.REACT_APP_IXSALE_ADDRESS_BASE || '',
}

export const PAYOUT_ADDRESS = {
  [42]: '0xBf432B246e20afa1E26170932b8aD067F2dD52B2',
  [80002]: '0xad254DcBBedD1455D21848F668fE120DCec52E4c', // amoy
  [84532]: '0x72Dc60450Daf5c72d2b6b9a52f4Db7321Ffdb7Ad', // base sepolia
  [137]: process.env.REACT_APP_PAYOUT_ADDRESS_POLYGON,
  [8453]: process.env.REACT_APP_PAYOUT_ADDRESS_BASE,
} as Record<number, string>

export const PAYOUT_AIRDROP_PROXY_ADDRESS = {
  [80002]: '0xdcd1a5a50f99d7a73b4b783a87a847a410dfe231', // amoy
  [84532]: '0xCF644341F6dC94533BC0748f205b371b81a86865', // base sepolia
  [137]: process.env.REACT_APP_PAYOUT_AIRDROP_PROXY_ADDRESS_POLYGON,
  [8453]: process.env.REACT_APP_PAYOUT_AIRDROP_PROXY_ADDRESS_BASE,
} as Record<number, string>

export const STAKING_ALTERNATE_MAP = {
  [SupportedChainId.MAINNET]: SupportedChainId.KOVAN,
  [SupportedChainId.KOVAN]: SupportedChainId.MUMBAI,
  [SupportedChainId.MATIC]: SupportedChainId.MAINNET,
  [SupportedChainId.MUMBAI]: SupportedChainId.KOVAN,
}

export const testStableCoinsTokens = [
  { name: 'Tether USD', symbol: 'USDT', address: '0x296275783B369ce3DAc1F4bF7aA5165Aa0dFC6d8' },
  { name: 'Ixswap Stable Coin', symbol: 'IUSDC', address: '0xFfF7880d81D2E2ec676209E75BBCF35D1974168a' },
  { name: 'Ixswap Stable Coin DAI', symbol: 'IDAI', address: '0x992A460e0ef16b94118a98ADEE14C72e6A9aA34F' },
]
export const ixSwapToken = [
  {
    name: 'IXSwap Token',
    symbol: 'IXS',
    address: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2',
    contractAddress: '0x10367e146e497267a9fc0c4f47702005f194a13c',
  },
]
export const testSecTokens = [
  { name: 'Apple', symbol: 'AAPL', address: '0x4af89c907fba907d9ba74cb44ebf8a7a65c53e6e' },
  { name: 'Coinbase', symbol: 'COIN', address: '0x6a2951cc518efadd7beec657a99554d17a7a85cd' },
  { name: 'Tesla', symbol: 'TSLA', address: '0x1d722f4334ad3f0154e3e3711378f534a07e4329' },
]

export const TOKEN_ADDRESSES: { [key: string]: { [key: number]: string } } = {
  'USDC.e': {
    [137]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  },
  USDC: {
    [137]: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    [80002]: '0xA9bc9D3F0fF05AB339D1E195982794B15beA0f88',
    [84532]: '0xA9c2c7D5E9bdA19bF9728384FFD3cF71Ada5dfcB',
    [8453]: isProd ? '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' : '0xD971d0d96cc21576fbbc237C7a5B27A249cF67ca',
  },
  USDT: {
    [137]: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    [84532]: '0x142953B2F88D0939FD9f48F4bFfa3A2BFa21e4F8',
    [8453]: isProd ? '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2' : '0xbCDfB2F1c0f9237274736fda5Bd290CAF467B69A',
  },
}

export const LBP_FACTORY_ADDRESS = {
  [80002]: '0x812A5D130D8bc37c9201318cE851EcC2492aB311',
  [137]: '0xA9F30b54C732BD12E2a2373a50642a4E0d4A89B5',
  [84532]: '0x50629ad11a66Da346364F96695BD5F299a70664B',
  [8453]: isProd ? '' : '0x63872f91dC88E44b61B991c73BEf8cC1672c3614', // TODO: add base chain
} as Record<number, string>

export const VOTING_ESCROW_ADDRESS = {
  [84532]: '0x72Dc60450Daf5c72d2b6b9a52f4Db7321Ffdb7Ad', // base sepolia
} as ContractAddressRecord
