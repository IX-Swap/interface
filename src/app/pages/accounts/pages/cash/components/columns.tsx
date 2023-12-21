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
    key: 'balance.available',
    label: 'Balance',
    headAlign: 'right',
    align: 'right',
    render: renderAmount
  },
  {
    key: 'balance.outstanding',
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
    render: (value?: string) => renderMoney(value, 'USD')
  },
  {
    key: 'accountNumber',
    label: 'Account Number'
  }
]

export const compactColumns = [...columns]
