import { Currency } from '@ixswap1/sdk-core'

export const formatCurrencySymbol = ({ currency }: { currency?: Currency | null }) => {
  const symbolText = currency?.symbol ?? currency?.name ?? ''
  return currency && symbolText && symbolText.length > 20
    ? symbolText.slice(0, 4) + '...' + symbolText.slice(symbolText.length - 5, symbolText.length)
    : symbolText
}
