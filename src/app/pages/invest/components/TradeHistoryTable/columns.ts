import { formatDistance } from 'date-fns'
import { formatAmount } from 'helpers/numbers'
import { renderSide } from 'helpers/rendering'
import { TableColumn } from 'types/util'

const renderDate = (date: string) =>
  formatDistance(new Date(date), new Date(), { addSuffix: true })

export const columns: Array<TableColumn<any>> = [
  {
    key: 'date',
    label: 'Date',
    render: renderDate
  },
  {
    key: 'pair',
    label: 'Pair'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'side',
    label: 'Side',
    render: renderSide
  },
  {
    key: 'type',
    label: 'Type'
  },
  {
    key: 'investedAmount',
    label: 'Invested Amount',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  },
  {
    key: 'unitPrice',
    label: 'Unit Price',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  },
  {
    key: 'totalAmount',
    label: 'Total Amount',
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  }
]
