import React from 'react'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { columns } from './columns'
import { Actions } from './Actions'

export interface FirstTableItem {
  currency: string
  balance: string
  usdValue: string
  availableBalance: string
}

export const firstTableItems: FirstTableItem[] = [
  {
    currency: 'USD',
    balance: '62,230.00',
    usdValue: '62,230.00',
    availableBalance: '48,156.00'
  },
  {
    currency: 'SGD',
    balance: '36,652.00',
    usdValue: '32,008.00',
    availableBalance: '20,700.00'
  }
]

export const FirstTable = () => {
  return (
    <TableView<FirstTableItem>
      columns={columns}
      fakeItems={firstTableItems}
      actions={Actions}
      size={'small'}
    />
  )
}
