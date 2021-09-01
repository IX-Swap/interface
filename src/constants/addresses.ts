import { FACTORY_ADDRESS } from '@ixswap1/v2-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'

export const MULTICALL2_ADDRESSES = constructSameAddressMap('0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696')
export const IXS_ADDRESS = constructSameAddressMap('0xB64dDc38BD73Bc283ad10100CdA9043eFF7fbE9F')
export const IXS_GOVERNANCE_ADDRESS = constructSameAddressMap('0xA94A5E15989f36e0C3b3A78B6Ff6E20Ed2373d1b')
export const IXS_VESTING_ADDRESS = constructSameAddressMap('0x91112a4B1A0c7f5eE34Cc4d812fd51f9011fD7F5')
// IXS Token staking V1 (post TGE) address
export const IXS_STAKING_V1_ADDRESS = constructSameAddressMap('0xEB5C601cfB10EC49888be9aE726Cf7ce2CEBF16d')
export const SWAP_ROUTER_ADDRESS = constructSameAddressMap('0x7B5DFB320E666cB809b5811BB61B0Ad25cbf63Bb')
export const LIQUIDITY_ROUTER_ADDRESS = constructSameAddressMap('0x86A090F0AFb19e9E70008B466b2052ae42904E96')
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
export const SWAP_ROUTER_ADDRESSES = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564')
