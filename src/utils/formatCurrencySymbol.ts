import { Currency } from '@ixswap1/sdk-core'

export const formatCurrencySymbol = ({ currency }: { currency?: Currency | null }) =>
  currency && currency.symbol && currency.symbol.length > 20
    ? currency.symbol.slice(0, 4) + '...' + currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
    : currency?.symbol
