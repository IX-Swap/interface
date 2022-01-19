import { CashWithdrawal } from 'types/cashWithdrawal'
import { TableColumn } from 'types/util'
import { getTimeAgoFromString } from 'helpers/dates'
import { formatMoney } from 'helpers/numbers'

const columns: Array<TableColumn<CashWithdrawal>> = [
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: getTimeAgoFromString
  },
  {
    key: 'bank.bankName',
    label: 'Bank Name'
  },
  {
    key: 'bank.bankAccountNumber',
    label: 'Bank Account Number',
    secret: true
  },
  {
    key: 'amount',
    align: 'right',
    headAlign: 'right',
    label: 'Amount',
    secret: true,
    render: (val: number, row: CashWithdrawal) =>
      formatMoney(val, row?.currency ?? row.asset?.symbol)
  },
  {
    key: 'status',
    label: 'Status'
  }
]

export default columns
