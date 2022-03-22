import { Currency } from '@ixswap1/sdk-core'

export function currencyId(currency?: Currency): string {
  if (!currency) {
    throw new Error('invalid currency')
  }

  if (currency.isNative) return 'ETH'

  return currency.address
}
