import moment from 'moment'
import { CashDeposit } from 'v2/types/cashdeposit'
import { TableColumn } from 'v2/types/util'

const columns: Array<TableColumn<CashDeposit>> = [
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: (val: string) => moment(val).format('MM/DD/YY')
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right',
    render: (val: number, row: CashDeposit) =>
      `${row.asset.symbol} ${val
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
  },
  {
    key: 'status',
    label: ''
  }
]

export default columns
