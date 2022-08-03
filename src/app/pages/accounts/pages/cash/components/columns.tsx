import { renderMoney } from 'helpers/numbers'
import { renderAmount, renderCurrencyLabel } from 'helpers/tables'
import { ConvertedAssetBalance } from 'types/balance'
import { TableColumn } from 'types/util'

export const columns: Array<TableColumn<ConvertedAssetBalance>> = [
  {
    key: 'currency',
    label: 'Currency',
    align: 'left',
    render: renderCurrencyLabel
  },
  {
    key: 'balance.outstanding',
    label: 'Balance',
    render: renderAmount
  },
  {
    key: 'balance.available',
    label: 'Available Balance',
    render: renderAmount
  },
  {
    key: 'balance.usdValue',
    label: 'USD Value',
    render: (value?: string) => renderMoney(value, 'USD')
  },
  {
    key: 'accountNumber',
    label: 'Account Number'
  }
]

export const compactColumns = [...columns]
