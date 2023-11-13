import React from 'react'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAddressColumn } from 'helpers/rendering'
import { TableColumn } from 'types/util'
import { RemoveFromWhitelist } from './RemoveFromWhitelist'

export const columns: Array<TableColumn<any>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'user.name',
    label: 'Investor Name'
  },
  {
    key: 'asset.symbol',
    label: 'STO Symbol'
  },
  {
    key: 'asset.name',
    label: 'STO Name'
  },
  {
    key: 'address',
    label: 'Wallet Address',
    render: renderAddressColumn
  },
  {
    key: 'address',
    label: 'Action',
    render: (address, row) => (
      <RemoveFromWhitelist address={address} assetId={row.asset._id} />
    )
  }
]
