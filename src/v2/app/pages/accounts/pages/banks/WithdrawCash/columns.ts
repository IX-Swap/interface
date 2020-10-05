import moment from 'moment'
import { CashWithdrawal } from 'v2/types/cash-withdrawal'
import { TableColumn } from 'v2/types/util'

const columns: Array<TableColumn<CashWithdrawal>> = [
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: (val, row) => moment(val).format('MM/DD/YY')
  },
  {
    key: 'bankAccount.bankName',
    label: 'Bank Name'
  },
  {
    key: 'bankAccount.bankAccountNumber',
    label: 'Bank Account Number'
  },
  {
    key: 'amount',
    align: 'right',
    headAlign: 'right',
    label: 'Amount',
    render: (val: number, row: CashWithdrawal) =>
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
