import { renderAmount, renderCurrencyLabel } from 'helpers/tables'
import { ConvertedAssetBalance } from 'types/balance'
import { TableColumn } from 'types/util'

export const columns: Array<TableColumn<ConvertedAssetBalance>> = [
  {
    key: 'currency',
    label: 'Currency',
    render: renderCurrencyLabel
  },
  {
    key: 'balance.outstanding',
    label: 'Balance',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'balance.available',
    label: 'Available Balance',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'balance.usdValue',
    label: 'USD Value',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'accountNumber',
    label: 'Account Number',
    headAlign: 'right',
    align: 'right'
  }
]
