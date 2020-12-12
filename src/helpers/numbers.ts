export const formatAmount = (value: number) => {
  if (value === undefined || value === null) return ''

  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export const formatMoney = (
  value: number | null,
  symbol: string = 'SGD',
  right = false
): string => {
  if (value === undefined || value === null) return ''

  const money = formatAmount(value ?? 0)
  const val = [symbol, money]

  return right ? val.reverse().join(' ') : val.join(' ')
}

export const toPercentage = (value: number): string =>
  `${(value * 100).toFixed(2)}%`

export const generateRandom = (length: number, chars: string): string => {
  let mask = ''
  if (chars.includes('a')) mask += 'abcdefghijklmnopqrstuvwxyz'
  if (chars.includes('A')) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (chars.includes('#')) mask += '0123456789'
  if (chars.includes('!')) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'
  let result = ''
  for (let i = length; i > 0; i -= 1) {
    result += mask[Math.round(Math.random() * (mask.length - 1))]
  }

  return result
}

export const addLeadingZeros = (num: number | string, length: number) => {
  const zeroes = new Array(length + 1 - num.toString().length).join('0')
  return `${zeroes}${num}`
}
   
