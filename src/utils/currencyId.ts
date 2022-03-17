import { Currency } from '@ixswap1/sdk-core'

export function currencyId(currency?: Currency & { tokenInfo?: { catalogId: number } }): string {
  if (!currency) {
    throw new Error('invalid currency')
  }
  if (currency.isNative) return 'ETH'

  if (currency.tokenInfo?.catalogId) return `${currency.tokenInfo.catalogId}`

  return currency.address
}
