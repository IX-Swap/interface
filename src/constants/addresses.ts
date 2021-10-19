import { FACTORY_ADDRESS } from '@ixswap1/v2-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

export const MULTICALL2_ADDRESSES = constructSameAddressMap('0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696')

export const SUPPORTED_TGE_CHAINS = { MAIN: 1, KOVAN: 42, MATIC: 137, MUMBAI: 80001 }
export const TGE_CHAINS_WITH_SWAP = [SUPPORTED_TGE_CHAINS.KOVAN]
export const TGE_CHAINS_WITH_STAKING = [SUPPORTED_TGE_CHAINS.KOVAN, SUPPORTED_TGE_CHAINS.MAIN]
export const ETHEREUM_TGE_CHAINS = [SUPPORTED_TGE_CHAINS.KOVAN, SUPPORTED_TGE_CHAINS.MAIN]
export const MATIC_TGE_CHAINS = [SUPPORTED_TGE_CHAINS.MATIC, SUPPORTED_TGE_CHAINS.MUMBAI]
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
  // setting matic chains equal to kovan for now
  [80001]: '0xB1519Ffe2761Eb68C11F53eBb550f71C4E04C35F',
  [137]: '0xB1519Ffe2761Eb68C11F53eBb550f71C4E04C35F',
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
  [42]: '0xf49A087aA48C0A4f0dEa6428F1175e1bB45CDAa2',
  [80001]: '',
  [137]: '',
}
export const SWAP_ROUTER_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '0xF7C90cF724Ef6136cbC1B22d5AdED757e48B3888',
  [80001]: '',
  [137]: '',
}
export const LIQUIDITY_ROUTER_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '0xD306285ee5D6e89E6B07985973669BDd7dE4Af2e',
  [80001]: '',
  [137]: '',
}
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId: number]: string } = {
  [1]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const V2_CORE_FACTORY_ADDRESSES = constructSameAddressMap(FACTORY_ADDRESS)
export const ARGENT_WALLET_DETECTOR_ADDRESS: { [chainId: number]: string } = {
  [1]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const ENS_REGISTRAR_ADDRESSES = {
  [1]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [5]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [4]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [3]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES = {
  [1]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}

export const STAKING_ALTERNATE_MAP = {
  [SupportedChainId.MAINNET]: SupportedChainId.KOVAN,
  [SupportedChainId.KOVAN]: SupportedChainId.MAINNET,
  [SupportedChainId.MATIC]: SupportedChainId.MAINNET,
  [SupportedChainId.MUMBAI]: SupportedChainId.KOVAN,
}
