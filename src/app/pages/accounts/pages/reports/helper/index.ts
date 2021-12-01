import { formatAmount } from 'helpers/numbers'

export const formatValue = (value: string | number) =>
  typeof value === 'number' ? formatAmount(value) : value
