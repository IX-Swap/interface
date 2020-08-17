import moment from 'moment'
import { TableColumn } from '../../../../types/util'
import { CashDeposit } from '../../../../types/cashdeposit'
import { formatMoney } from '../../../../helpers/numbers'

const columns: Array<TableColumn<CashDeposit>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: (val) => moment(val).format('MM/DD/YYYY')
  },
  {
    key: 'individual.firstName',
    label: 'User',
    render: (val: string, row: CashDeposit) =>
      `${val} ${row.individual.lastName}`
  },
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'depositCode',
    label: 'Deposit Code'
  },
  {
    key: 'amount',
    label: 'Amount',
    headAlign: 'right',
    align: 'right',
    render: (val, row) => formatMoney(parseFloat(val || '0'), row.asset.symbol)
  }
]

export default columns
