import { TableColumn } from 'types/util'
import { DSWithdrawal } from 'types/dsWithdrawal'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'
import { renderAssetName, renderAssetSymbol } from 'helpers/tables'
import { renderAddressColumn } from 'helpers/rendering'
import { isEmpty } from 'lodash'

export const columns: Array<TableColumn<DSWithdrawal>> = [
  {
    key: 'txHash',
    label: 'Transaction Hash',
    render: txHash => (!isEmpty(txHash) ? renderAddressColumn(txHash) : '-')
  },
  {
    key: 'createdAt',
    label: 'Created At',
    render: formatDateToMMDDYY
  },
  {
    key: 'user.name',
    label: 'Username'
  },
  //   {
  //     key: 'level',
  //     label: 'Level'
  //   },
  {
    key: 'asset',
    label: 'STO Name',
    render: renderAssetName
  },
  {
    key: 'asset',
    label: 'STO Symbol',
    render: renderAssetSymbol
  },
  {
    key: 'withdrawalAddress.label',
    label: 'Address Label'
  },
  {
    key: 'withdrawalAddress.address',
    label: 'Wallet Address',
    render: renderAddressColumn
  },
  {
    key: 'amount',
    label: 'Amount of Tokens',
    align: 'right',
    headAlign: 'right',
    render: formatAmount
  }
]
