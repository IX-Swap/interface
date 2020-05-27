// @flow

// Adds decimal places and commas
export const formatMoney = (value: number, symbol?: string = 'SGD'): string =>
  `${symbol} ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

// Adds commas
export const formatNumber = (value: number): string =>
  value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
