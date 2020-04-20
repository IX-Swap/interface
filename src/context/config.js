export const apiUrl = (() => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://localhost:3456'
  }
  return 'https://api.mozork.io'
})()
