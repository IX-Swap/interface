import { renderStatusColumn } from 'v2/app/pages/authorizer/hooks/useAuthorizerView'

export const columns = [
  {
    key: 'currency.symbol',
    label: 'Currency'
  },
  {
    key: 'bankName',
    label: 'Bank Name'
  },
  {
    key: 'bankAccountNumber',
    label: 'Account Number'
  },
  {
    key: 'accountHolderName',
    label: 'Account Name'
  },
  {
    key: 'swiftCode',
    label: 'Swift Code'
  },
  {
    key: 'status',
    label: 'Status',
    render: renderStatusColumn
  }
]
