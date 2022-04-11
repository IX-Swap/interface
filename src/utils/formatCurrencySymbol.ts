import { Currency } from '@ixswap1/sdk-core'

type SecCurrency = Currency & {
  originalSymbol?: string | null
}

export const formatCurrencySymbol = ({ currency }: { currency?: SecCurrency | null }) => {
  const symbolText = currency?.originalSymbol ?? currency?.symbol ?? currency?.name ?? ''
  return currency && symbolText && symbolText.length > 20
    ? symbolText.slice(0, 4) + '...' + symbolText.slice(symbolText.length - 5, symbolText.length)
    : symbolText
}
