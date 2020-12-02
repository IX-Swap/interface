export const formatAmount = (value: number) => {
  if (value === undefined || value === null) return ''

  return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export const abbreviateNumber = (
  value: number | null,
  symbol: string = 'SGD',
  right = false
) => {
  let newValue = `${value ?? ''}`
  if (typeof value === 'number' && value >= 1000) {
    const suffixes = ['', 'K', 'M', 'B', 'T']
    const suffixNum = Math.floor(`${value}`.length / 3)
    let shortValue: string | number = ''
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      )
      var dotLessShortValue = `${shortValue}`.replace(/[^a-zA-Z 0-9]+/g, '')
      if (dotLessShortValue.length <= 2) {
        break
      }
    }
    if (typeof shortValue === 'number' && shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1)
    }
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    newValue = shortValue + suffixes[suffixNum]
  }

  const val = [symbol, newValue]

  return right ? val.reverse().join(' ') : val.join(' ')
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
