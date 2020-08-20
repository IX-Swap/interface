import { TableColumn } from 'v2/types/util'
import { CashWithdrawal } from 'v2/types/cash-withdrawal'
import { convertStringToMMDDYY } from 'v2/helpers/dates'
import { renderAmount, renderFirstName } from 'v2/helpers/tables'

export const columns: Array<TableColumn<CashWithdrawal>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: convertStringToMMDDYY
  },
  {
    key: 'individual.firstName',
    label: 'Name',
    render: renderFirstName
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
    render: renderAmount
  }
]
