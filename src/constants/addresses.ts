import { FACTORY_ADDRESS } from '@ixswap1/v2-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'

export const MULTICALL2_ADDRESSES = constructSameAddressMap('0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696')
export const IXS_ADDRESS = constructSameAddressMap('0x3b742D5e5a613e9F86d541be8094926397C2BD65')
export const V2_ROUTER_ADDRESS = constructSameAddressMap('0x9bb06bad7022561E621E299929799e4fc517daE1')
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
