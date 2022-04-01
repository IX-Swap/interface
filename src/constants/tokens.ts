import { Currency, Ether, NativeCurrency, Token, WETH9 } from '@ixswap1/sdk-core'
import invariant from 'tiny-invariant'

import { IXS_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'

export const AMPL = new Token(1, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
export const DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(1, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const WBTC = new Token(1, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')
export const FEI = new Token(1, '0x956F47F50A910163D8BF957Cf5846D573E7f87CA', 18, 'FEI', 'Fei USD')
export const TRIBE = new Token(1, '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B', 18, 'TRIBE', 'Tribe')
export const FRAX = new Token(1, '0x853d955aCEf822Db058eb8505911ED77F175b99e', 18, 'FRAX', 'Frax')
export const FXS = new Token(1, '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0', 18, 'FXS', 'Frax Share')
export const renBTC = new Token(1, '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D', 8, 'renBTC', 'renBTC')
export const UMA = new Token(1, '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828', 18, 'UMA', 'UMA Voting Token v1')
export const ETH2X_FLI = new Token(
  1,
  '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
  18,
  'ETH2x-FLI',
  'ETH 2x Flexible Leverage Index'
)
// Mirror Protocol compat.
export const UST = new Token(1, '0xa47c8bf37f92abed4a126bda807a7b7498661acd', 18, 'UST', 'Wrapped UST')
export const MIR = new Token(1, '0x09a3ecafa817268f77be1283176b946c4ff2e608', 18, 'MIR', 'Wrapped MIR')
export const IXS: { [chainId: number]: Token } = {
  [1]: new Token(1, IXS_ADDRESS[1], 18, 'IXS', 'IXS'),
  [4]: new Token(4, IXS_ADDRESS[4], 18, 'IXS', 'IXS'),
  [3]: new Token(3, IXS_ADDRESS[3], 18, 'IXS', 'IXS'),
  [5]: new Token(5, IXS_ADDRESS[5], 18, 'IXS', 'IXS'),
  [42]: new Token(42, IXS_ADDRESS[42], 18, 'IXS', 'IXS'),
  [80001]: new Token(80001, IXS_ADDRESS[80001], 18, 'IXS', 'IXS'),
  [137]: new Token(137, IXS_ADDRESS[137], 18, 'IXS', 'IXS'),
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),
  [SupportedChainId.MATIC]: new Token(
    SupportedChainId.MATIC,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  [SupportedChainId.MUMBAI]: new Token(
    SupportedChainId.MUMBAI,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
}

function isMatic(chainId: number) {
  return chainId === SupportedChainId.MUMBAI || chainId === SupportedChainId.MATIC
}

class MaticNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other?.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isMatic(this.chainId)) throw new Error('Not matic')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isMatic(chainId)) throw new Error('Not matic')
    super(chainId, 18, 'MATIC', 'Polygon Matic')
  }
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error('Unsupported chain ID')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {}

export function nativeOnChain(chainId: number) {
  return (
    cachedNativeCurrency[chainId] ??
    (cachedNativeCurrency[chainId] = isMatic(chainId)
      ? new MaticNativeCurrency(chainId)
      : ExtendedEther.onChain(chainId))
  )
}

export const TOKEN_SHORTHANDS: { [shorthand: string]: { [chainId in SupportedChainId]?: string } } = {
  USDC: {
    [SupportedChainId.MAINNET]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    [SupportedChainId.KOVAN]: '0x31eeb2d0f9b6fd8642914ab10f4dd473677d80df',
    [SupportedChainId.MUMBAI]: '0xe11a86849d99f524cac3e7a0ec1241828e332c62',
    [SupportedChainId.MATIC]: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  },
}
