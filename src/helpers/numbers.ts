import getSymbolFromCurrency from 'currency-symbol-map'
import { OTCOrder } from 'types/otcOrder'

export const isNotNullish = (value?: number | null) => {
  return value !== undefined && value !== null && value > 0
}

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
export const formatRoundedAmount = (value: number) => {
  if (value === undefined || value === null) return ''
  return Math.round(Number(value.toFixed(2)))
}

export const formatAmountValue = (value: string | number) =>
  typeof value === 'number' ? formatAmount(value) : value

export const formatDecimal = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'decimal' }).format(value)
}

export const abbreviateNumber = (
  value: number | null,
  symbol?: string,
  right?: boolean,
  formatter?: any,
  isCustomSymbol?: boolean
) => {
  // https://stackoverflow.com/a/60980688

  const defaultFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
    compactDisplay: 'short'
  })

  const num: string | number =
    formatter !== undefined
      ? formatter.format(value ?? 0)
      : defaultFormatter.format(value ?? 0)

  if (
    isCustomSymbol !== undefined &&
    isCustomSymbol &&
    symbol !== undefined &&
    num !== undefined
  ) {
    return `${getSymbolFromCurrency(symbol) ?? 'S$'} ${num ?? 0}`
  }

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

export const formatTokenBalance = (
  value: number | undefined,
  symbol: string
) => {
  if (value === undefined) {
    return addSymbol('0.00', symbol)
  }
  if (Number.isInteger(value)) {
    return formatMoney(value, symbol)
  }
  return [symbol, value].join(' ')
}

export const calculatePercent = (value: number, total: number): number =>
  Math.min(100, (100 * value) / total)

export const formatPercent = (value: number): string => `${value.toFixed(2)}%`

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

export const getFilledRoundedPercentage = ({
  amount,
  availableAmount
}: {
  amount: number
  availableAmount?: number
}) => {
  const percentAmount = ((amount - (availableAmount ?? amount)) / amount) * 100
  return `${Math.round(Number(percentAmount.toFixed(2)))}%`
}

export const getRoundedPercentage = ({
  amount,
  matchedAmount
}: {
  amount: number
  matchedAmount: number
}) => {
  const percentAmount = (matchedAmount / amount) * 100
  return `${Math.round(Number(percentAmount.toFixed(2)))}%`
}

export const renderMoney = (value: any, row?: any) => formatMoney(value, '')
export const renderTotal = ({
  price,
  amount,
  row
}: {
  price: number
  amount: number
  row: OTCOrder
}) => {
  return formatMoney(amount * price, getOrderCurrency(row), false)
}

export const getOrderCurrency = (row: OTCOrder) =>
  row?.pair?.name?.split('/')[1]
