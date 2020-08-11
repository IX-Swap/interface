//

// Adds decimal places and commas
export const formatMoney = (value, symbol = 'SGD') =>
  `${symbol} ${(+value || 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`

// Adds commas
export const formatNumber = value =>
  value
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const toPercentage = value => `${(value * 100).toFixed(2)}%`
