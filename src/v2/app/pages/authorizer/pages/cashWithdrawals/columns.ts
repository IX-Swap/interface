import { TableColumn } from 'v2/types/util'
import { CashWithdrawal } from 'v2/types/cashWithdrawal'
import { formatDateToMMDDYY } from 'v2/helpers/dates'
import { renderAmount, renderIndividualOrCompanyName } from 'v2/helpers/tables'

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
    key: 'bank.bankAccountNumber',
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
