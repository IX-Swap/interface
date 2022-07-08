// a list of tokens by chain
import { Currency, Ether, Token, WETH9 } from '@ixswap1/sdk-core'
import DEFAULT_TOKEN_LIST from '@ixswap1/default-token-list'

import { IXS, USDC } from './tokens'
import { listToTokenMapArray } from 'state/lists/hooks'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

// List of all mirror's assets addresses.
// Last pulled from : https://whitelist.mirror.finance/eth/tokenlists.json
// TODO: Generate this programmatically ?

const TRANSFORMED_DEFAULT_TOKEN_LIST = listToTokenMapArray(DEFAULT_TOKEN_LIST)

const WETH_ONLY: ChainTokenList = {
  [1]: [WETH9[1]],
  [3]: [WETH9[3]],
  [4]: [WETH9[4]],
  [5]: [WETH9[5]],
  [42]: [WETH9[42]],
  [137]: [WETH9[137]],
}

// used only for testing multihop on kovan
const TEST_TOKENS = [
  new Token(42, '0x1bdFF869D71E8e42D71e19E015fcC9E3Fc50e579', 18, 'WSEC', 'WSEC'),
  new Token(42, '0x9b22472E7dd78c31FF139D6d76A579dfcF9aC634', 18, 'SEC', 'SEC'),
  new Token(42, '0x143610a6D610c5ce9096d4ebaF6A85D98F32A1Fe', 18, 'QQ', 'QQ'),
  new Token(42, '0x564efF0E726e2d2346F1231a93F3184a18FC0e94', 18, 'EE', 'EE'),
  new Token(42, '0x9E9B2eE771629E2edFf526748e2ddc69122953fc', 18, 'WW', 'WW'),
  new Token(42, '0xF7526D3aA11496CCD4FB6A505b64B74E7bBd8F71', 18, 'RR', 'RR'),
  new Token(42, '0x40Fe1CC36fA8dAabCf680B6742966344d209f9f2', 18, 'AA', 'AA'),
]

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [1]: [...WETH_ONLY[1], ...TRANSFORMED_DEFAULT_TOKEN_LIST[1], USDC[1], IXS[1]],
  [42]: [...WETH_ONLY[42], ...TEST_TOKENS, ...TRANSFORMED_DEFAULT_TOKEN_LIST[42], USDC[42], IXS[42]],
  [137]: [...WETH_ONLY[137], ...TRANSFORMED_DEFAULT_TOKEN_LIST[137], USDC[137], IXS[137]],
}
export const ADDITIONAL_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
  [1]: {},
  [42]: {},
  [137]: {
    // '0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0': [ETH2X_FLI],
    // '0xA948E86885e12Fb09AfEF8C52142EBDbDf73cD18': [IXS[1]],
    // '0x561a4717537ff4AF5c687328c0f7E90a319705C0': [IXS[1]],
    // '0xa6e3454fec677772dd771788a079355e43910638': [UMA],
    // [FEI.address]: [TRIBE],
    // [TRIBE.address]: [FEI],
    // [FRAX.address]: [FXS],
    // [FXS.address]: [FRAX],
    // [WBTC.address]: [renBTC],
    // [renBTC.address]: [WBTC],
  },
}
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {
  [1]: {
    // [AMPL.address]: [DAI, WETH9[1]],
  },
  [42]: {},
  [137]: {},
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainCurrencyList = {
  [1]: [Ether.onChain(1), USDC[1], WETH9[1]],
  [3]: [Ether.onChain(3), WETH9[3]],
  [4]: [Ether.onChain(4), WETH9[4]],
  [5]: [Ether.onChain(5), WETH9[5]],
  [42]: [Ether.onChain(42), WETH9[42], USDC[42]],
  [137]: [Ether.onChain(137), WETH9[137], USDC[137]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [1]: [...WETH_ONLY[1], ...TRANSFORMED_DEFAULT_TOKEN_LIST[1], USDC[1], IXS[1]],
  [42]: [...WETH_ONLY[42], ...TEST_TOKENS, ...TRANSFORMED_DEFAULT_TOKEN_LIST[42], USDC[42], IXS[42]],
  [137]: [...WETH_ONLY[137], ...TRANSFORMED_DEFAULT_TOKEN_LIST[137], USDC[137], IXS[137]],
}
export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [1]: [[USDC[1], IXS[1]]],
  [42]: [[USDC[42], IXS[42]]],
  [137]: [[USDC[137], IXS[137]]],
}
