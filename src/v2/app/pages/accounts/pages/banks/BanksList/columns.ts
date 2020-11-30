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
    label: 'Account Number',
    secret: true
  },
  {
    key: 'accountHolderName',
    label: 'Account Name',
    secret: true
  },
  {
    key: 'swiftCode',
    label: 'Swift Code',
    secret: true
  },
  {
    key: 'status',
    label: 'Status',
    render: renderStatusColumn
  }
]
