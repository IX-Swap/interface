// Adds decimal places and commas
export const formatMoney = (value) =>
  value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

// Adds commas
export const formatNumber = (value) =>
  value && value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
