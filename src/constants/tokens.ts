import { Currency, Ether, NativeCurrency, Token, WETH9 } from '@ixswap1/sdk-core'
import invariant from 'tiny-invariant'

import { IXS_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'

export const USDC: { [chainId: number]: Token } = {
  [1]: new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C'),
  [42]: new Token(42, '0xe22da380ee6B445bb8273C81944ADEB6E8450422', 6, 'USDC', 'USD//C'),
  [137]: new Token(137, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6, 'USDC', 'USD//C'),
}

// Mirror Protocol compat.
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

export const TOKEN_SHORTHANDS: { [shorthand: string]: Record<any, any> } = {
  USDC: {
    [SupportedChainId.MAINNET]: USDC[1],
    [SupportedChainId.KOVAN]: USDC[42],
    [SupportedChainId.MATIC]: USDC[137],
    // [SupportedChainId.MUMBAI]: '0xe11a86849d99f524cac3e7a0ec1241828e332c62',
  },
  IXS: {
    [SupportedChainId.MAINNET]: IXS[1],
    [SupportedChainId.KOVAN]: IXS[42],
    [SupportedChainId.MATIC]: IXS[137],
  },
}
