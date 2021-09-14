import { VirtualTransaction } from 'types/transaction'
import { formatMoney } from 'helpers/numbers'

export const getCorrectDirectionFilterValues = (
  transferDirection: string | undefined
) => {
  if (transferDirection === undefined) {
    return undefined
  }
  if (transferDirection.includes(' to ')) {
    return transferDirection.replace(' to ', '2')
  }
  return transferDirection
}

export const renderFromField = (from: string, item: VirtualTransaction) => {
  const swiftCode = item.detail.debtorSwiftCode
  if (from === '' || from === undefined) {
    return '-'
  }

  if (swiftCode === undefined || swiftCode === '') {
    return from
  }
  return from.concat(` (${swiftCode})`)
}

export const renderToField = (to: string, item: VirtualTransaction) => {
  const swiftCode = item.detail.creditorSwiftCode
  if (to === '' || to === undefined) {
    return '-'
  }

  if (swiftCode === undefined || swiftCode === '') {
    return to
  }
  return to.concat(` (${swiftCode})`)
}

export const renderDirection = (direction: string) => {
  if (direction.includes('2')) {
    return direction.replace('2', ' to ')
  }
  return direction
}

export const renderAmount = (amount: number, item: VirtualTransaction) => {
  return formatMoney(amount, item.detail.currency)
}
