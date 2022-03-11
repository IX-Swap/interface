import { TableColumn } from 'types/util'
import { renderDateAndTimeField } from 'helpers/rendering'
import { VirtualTransaction } from 'types/transaction'
import {
  renderAmount,
  renderDirection,
  renderFromField,
  renderToField
} from 'app/pages/admin/components/VirtualTransactionsTable/utils'

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
    render: renderDirection
  },
  {
    key: 'detail.paymentMethod',
    label: 'Type Of Transfer'
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    render: renderAmount
  }
]
