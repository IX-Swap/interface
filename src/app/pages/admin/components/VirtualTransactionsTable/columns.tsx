import { TableColumn } from 'types/util'
import { renderDateAndTimeField } from 'helpers/rendering'
import { formatMoney } from 'helpers/numbers'
import { VirtualTransaction } from 'types/transaction'

const renderFromField = (from: string, item: VirtualTransaction) => {
  const swiftCode = item.detail.debtorSwiftCode
  if (swiftCode === undefined) {
    return from
  }
  return from.concat(` (${swiftCode})`)
}

const renderToField = (to: string, item: VirtualTransaction) => {
  const swiftCode = item.detail.creditorSwiftCode
  if (swiftCode === undefined) {
    return to
  }
  return to.concat(` (${swiftCode})`)
}

const renderDirectionField = (direction: string) => {
  if (direction.includes('2')) {
    return direction.replace('2', ' to ')
  }
  return direction
}

const renderAmount = (amount: number, item: VirtualTransaction) => {
  return formatMoney(amount, item.detail.currency)
}

export const columns: Array<TableColumn<VirtualTransaction>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: renderDateAndTimeField
  },
  {
    key: 'detail.debtorAccountNumber',
    label: 'From',
    render: renderFromField
  },
  {
    key: 'detail.creditorAccountNumber',
    label: 'To',
    render: renderToField
  },
  {
    key: 'detail.direction',
    label: 'Direction',
    render: renderDirectionField
  },
  {
    key: 'detail.paymentMethod',
    label: 'Types Of Transfer'
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    render: renderAmount
  }
]
