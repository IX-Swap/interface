export function formatCurrency(value: string | number, symbol: string, currency = 'USD') {
  if (!value) {
    return `${symbol}0`
  }
  return `${symbol}${value.toLocaleString('en-US', { style: 'currency', currency })}`
}
