import { TableColumn } from 'types/util'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAmount, renderIndividualOrCompanyName } from 'helpers/tables'

export const columns: Array<TableColumn<CashWithdrawal>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'identity.individual.firstName',
    label: 'Name',
    render: renderIndividualOrCompanyName
  },
  {
    key: 'level',
    label: 'Level'
  },
  {
    key: 'bank.bankName',
    label: 'Bank name'
  },
  {
    key: 'virtualAccount.accountNumber',
    label: 'Virtual Account'
  },
  {
    key: 'amount',
    label: 'Amount',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  }
]
