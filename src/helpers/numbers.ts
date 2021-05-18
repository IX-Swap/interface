export const addSymbol = (
  value: string | number | undefined,
  symbol: string = 'SGD',
  right = false
): string => {
  if (value === undefined) {
    return ''
  }

  const arr = [symbol, value.toLocaleString()]

  return right ? arr.reverse().join(' ') : arr.join(' ')
}

export const formatAmount = (value: number) => {
  if (value === undefined || value === null) return ''

  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export const formatCamelCase = (value: string) => {
  return (
    value.slice(0, 1).toLocaleUpperCase() +
    value.slice(1, value.length).toLocaleLowerCase()
  )
}

export const abbreviateNumber = (
  value: number | null,
  symbol?: string,
  right?: boolean
) => {
  // https://stackoverflow.com/a/60980688

  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    // @ts-expect-error
    notation: 'compact',
    compactDisplay: 'short'
  })

  const num = formatter.format(value ?? 0)

  return addSymbol(num, symbol, right)
}

export const formatMoney = (
  value: number | null,
  symbol?: string,
  right?: boolean
): string => {
  if (value === undefined || value === null) return ''

  const money = formatAmount(value ?? 0)

  return addSymbol(money, symbol, right)
}

export const calculatePercent = (value: number, total: number): number =>
  Math.min(100, (100 * value) / total)

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
  const zeroes =
    length > num.toString().length
      ? new Array(length + 1 - num.toString().length).join('0')
      : ''
  return `${zeroes}${num}`
}
