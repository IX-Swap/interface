import { FACTORY_ADDRESS } from '@ixswap1/v2-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

export const MULTICALL2_ADDRESSES = {
  [1]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [4]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [3]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [5]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [42]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [80001]: '0xBC3B2826B3968a877C82D274A0389c16fBBcc742',
  [137]: '0x65Eed76951B6660bb0b80AF8D8A3AC6b10C6e65F',
}
export const NFT_ADDRESS = {
  [1]: '',
  [4]: '0x6ECc7A1dCe9DD04A18a03bf0a537E9F77cd194fA',
  [3]: '',
  [5]: '',
  [42]: '0x4DB7dc4bDc3848F4E948A8a8bB31a9d2021D05a6',
  [80001]: '',
  [137]: '',
}

// export const ENV_SUPPORTED_TGE_CHAINS = [1, 42, 137] as number[] | undefined

export const ENV_SUPPORTED_TGE_CHAINS = (
  process.env.REACT_APP_SUPPORTED_TGE_CHAINS ? JSON.parse(process.env.REACT_APP_SUPPORTED_TGE_CHAINS) : undefined
) as number[] | undefined

export const SUPPORTED_TGE_CHAINS = { MAIN: 1, KOVAN: 42, MATIC: 137, MUMBAI: 80001, RINKEBY: 4 }

export const TGE_CHAINS_WITH_SWAP = ENV_SUPPORTED_TGE_CHAINS || [SUPPORTED_TGE_CHAINS.KOVAN]
export const TGE_CHAINS_WITH_STAKING = ENV_SUPPORTED_TGE_CHAINS || [
  SUPPORTED_TGE_CHAINS.KOVAN,
  SUPPORTED_TGE_CHAINS.MAIN,
  SUPPORTED_TGE_CHAINS.MUMBAI,
  SUPPORTED_TGE_CHAINS.MATIC,
]
export const ETHEREUM_TGE_CHAINS = [SUPPORTED_TGE_CHAINS.KOVAN, SUPPORTED_TGE_CHAINS.MAIN]
export const MATIC_TGE_CHAINS = [SUPPORTED_TGE_CHAINS.MATIC, SUPPORTED_TGE_CHAINS.MUMBAI]
export const MAIN_TGE_CHAINS = [SUPPORTED_TGE_CHAINS.MAIN, SUPPORTED_TGE_CHAINS.MATIC]
export const CREATE_TOKEN_CHAINS = ENV_SUPPORTED_TGE_CHAINS || [SUPPORTED_TGE_CHAINS.KOVAN, SUPPORTED_TGE_CHAINS.MATIC]
export const TGE_CHAINS_WITH_KYC = ENV_SUPPORTED_TGE_CHAINS || [
  SUPPORTED_TGE_CHAINS.MUMBAI,
  SUPPORTED_TGE_CHAINS.MATIC,
  SUPPORTED_TGE_CHAINS.KOVAN,
]
// the rest are same as kovan for now
export const IXS_ADDRESS: { [key: number]: string } = {
  [1]: '0x73d7c860998CA3c01Ce8c808F5577d94d545d1b4',
  [4]: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2',
  [3]: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2',
  [5]: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2',
  [42]: '0xA1997c88a60dCe7BF92A3644DA21e1FfC8F96dC2',
  [80001]: '0x3Dc2aA62a4bF480b92b09AB4fCD989c4e7b63E1b',
  [137]: '0x1ba17c639bdaecd8dc4aac37df062d17ee43a1b8',
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
  [80001]: '',
  [137]: '0x72f54BEbabE8A26794B8BFeA832b65B7Bd88da37',
}
export const LIQUIDITY_ROUTER_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '0xC4D56138b73D53Ff55313FC251053B735BA1cfA1',
  [80001]: '',
  [137]: '0x342172484664093B1F15Eb10B91721ba3e3DC97A',
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
  [80001]: '',
  [137]: '0xc2D0e0bc81494adB71Ce9Aa350cC875DaE12D81D',
}

export const IXSALE_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '',
  [80001]: process.env.REACT_APP_IXSALE_ADDRESS_MUMBAI || '',
  [137]: process.env.REACT_APP_IXSALE_ADDRESS_POLYGON || '',
}

export const PAYOUT_ADDRESS = {
  [42]: '0xBf432B246e20afa1E26170932b8aD067F2dD52B2',
  [137]: '0xd1B888b6fe05d9737ad0a0800253CD706254DB64',
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