// @flow

// Adds decimal places and commas
export const formatMoney = (value: number, symbol?: string = 'SGD'): string =>
  `${symbol} ${(+value || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`

// Adds commas
export const formatNumber = (value: number): string =>
  value
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const toPercentage = (value: number): string =>
  `${(value * 100).toFixed(2)}%`
