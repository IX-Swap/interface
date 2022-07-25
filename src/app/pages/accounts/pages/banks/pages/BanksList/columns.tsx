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
    label: 'Account Number'
  },
  {
    key: 'accountHolderName',
    label: 'Account Name'
  },
  {
    key: 'swiftCode',
    label: 'Swift Code'
  }
]

export const compactColumns = [...columns]
