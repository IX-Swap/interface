export const apiUrl = (() => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://api.mozork.com'
  }
  return 'https://api.investax.io'
})()
