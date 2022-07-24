import { renderCurrencyLabel } from 'helpers/tables'

export const columns = [
  {
    key: 'currency.symbol',
    label: 'Currency',
    render: renderCurrencyLabel
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
  }
]
