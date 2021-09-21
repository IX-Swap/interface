import { FACTORY_ADDRESS } from '@ixswap1/v2-sdk'
import { STAKING_CONTRACT_KOVAN } from 'config'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'

export const MULTICALL2_ADDRESSES = constructSameAddressMap('0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696')

// the rest are same as kovan for now
export const IXS_ADDRESS: { [key: number]: string } = {
  [1]: '0x73d7c860998CA3c01Ce8c808F5577d94d545d1b4',
  [4]: '0xB64dDc38BD73Bc283ad10100CdA9043eFF7fbE9F',
  [3]: '0xB64dDc38BD73Bc283ad10100CdA9043eFF7fbE9F',
  [5]: '0xB64dDc38BD73Bc283ad10100CdA9043eFF7fbE9F',
  [42]: '0xB64dDc38BD73Bc283ad10100CdA9043eFF7fbE9F',
}

export const IXS_GOVERNANCE_ADDRESS: { [key: number]: string } = {
  [1]: '0xf65dd1B5dE5655B56Ae8beAE49Bb2bCb95B1F20c',
  [42]: '0xA94A5E15989f36e0C3b3A78B6Ff6E20Ed2373d1b',
}
export const IXS_VESTING_ADDRESS: { [key: number]: string } = {
  [1]: '0x7e6A90091a77bcd49D48C412A54087981f915F7c',
  [42]: '0x91112a4B1A0c7f5eE34Cc4d812fd51f9011fD7F5',
}
// IXS Token staking V1 (post TGE) address
export const IXS_STAKING_V1_ADDRESS: { [key: number]: string } = {
  [1]: '0x13Ca6Daab84af2A452f86Ea437bb90c6217a220c',
  [42]: STAKING_CONTRACT_KOVAN,
}
export const SWAP_ROUTER_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '0x7B5DFB320E666cB809b5811BB61B0Ad25cbf63Bb',
}
export const LIQUIDITY_ROUTER_ADDRESS: { [key: number]: string } = {
  [1]: '',
  [42]: '0x86A090F0AFb19e9E70008B466b2052ae42904E96',
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
