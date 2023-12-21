import { formatDateToMMDDYY } from 'helpers/dates'
import { formatAmount } from 'helpers/numbers'
import {
  renderAddressColumn,
  renderStatus,
  renderTransactionHash
} from 'helpers/rendering'
import { TableColumn } from 'types/util'

export const columns: Array<TableColumn<any>> = [
  {
    key: 'txHash',
    label: 'Transaction Hash',
    render: (txHash, row) => renderTransactionHash(txHash, row.txHashLink, true)
  },
  {
    key: 'createdAt',
    label: 'Created At',
    render: formatDateToMMDDYY
  },
  {
    key: 'tokenName',
    label: 'STO Name'
  },
  {
    key: 'tokenSymbol',
    label: 'STO Symbol'
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
    headAlign: 'right',
    align: 'right',
    render: formatAmount
  },
  {
    key: 'status',
    label: 'Status',
    render: renderStatus
  }
]
