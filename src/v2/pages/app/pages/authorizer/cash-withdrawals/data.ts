import moment from 'moment'
import { TableColumn } from '../../../../../types/util'
import { CashWithdrawal } from '../../../../../types/cash-withdrawal'
import { formatMoney } from '../../../../../helpers/numbers'

const columns: Array<TableColumn<CashWithdrawal>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: (val: string) => moment(val).format('MM/DD/YYYY')
  },
  {
    key: 'individual.firstName',
    label: 'Name',
    render: (val: string, row: CashWithdrawal) => `${val} ${row.individual.lastName}`
  },
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'bankAccount.bankName',
    label: 'Bank name'
  },
  {
    key: 'bankAccount.bankAccountNumber',
    label: 'Account #'
  },
  {
    key: 'amount',
    label: 'Amount',
    headAlign: 'right',
    align: 'right',
    render: (val: string, row: CashWithdrawal) => formatMoney(parseFloat(val || '0'), row.asset.symbol)
  }
]

export default columns
