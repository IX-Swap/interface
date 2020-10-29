import { CashWithdrawal } from 'v2/types/cashWithdrawal'
import { TableColumn } from 'v2/types/util'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { formatMoney } from 'v2/helpers/numbers'
import { renderStatusColumn } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'

const columns: Array<TableColumn<CashWithdrawal>> = [
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'lastTransaction',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'bank.bankName',
    label: 'Bank Name'
  },
  {
    key: 'bank.bankAccountNumber',
    label: 'Bank Account Number'
  },
  {
    key: 'amount',
    align: 'right',
    headAlign: 'right',
    label: 'Amount',
    render: (val: number, row: CashWithdrawal) =>
      formatMoney(val, row.asset.symbol)
  },
  {
    key: 'status',
    label: 'Status',
    render: renderStatusColumn
  }
]

export default columns
