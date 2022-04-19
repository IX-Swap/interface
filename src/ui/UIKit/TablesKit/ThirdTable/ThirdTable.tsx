import React from 'react'
import { columns } from 'ui/UIKit/TablesKit/ThirdTable/columns'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { Actions } from 'ui/UIKit/TablesKit/ThirdTable/Actions'

export interface ThirdTableItem {
  currency: string
  bankName: string
  accountNumber: string
  accountName: string
  swiftCode: string
  status: string
}

export const thirdTableItems: ThirdTableItem[] = [
  {
    currency: 'USD',
    bankName: 'Citibank',
    accountNumber: '55748317',
    accountName: 'Theya Williams',
    swiftCode: 'GB82 WEST 1234 5698 7654 32',
    status: 'Connected'
  },
  {
    currency: 'EUR',
    bankName: 'Deutsche Bank',
    accountNumber: '15665487',
    accountName: 'Darlene Robertson',
    swiftCode: 'HG99 WEST 1548 5698 6155 32',
    status: 'Connected'
  },
  {
    currency: 'USD',
    bankName: 'American Express',
    accountNumber: '98456166',
    accountName: 'Guy Hawkins',
    swiftCode: 'GF54 WEST 1234 6455 7654 32',
    status: 'In progress'
  },
  {
    currency: 'USD',
    bankName: 'Investors Bank',
    accountNumber: '87781514',
    accountName: 'Esther Howard',
    swiftCode: 'KJ89 WEST 8948 5698 1645 32',
    status: 'Declined'
  }
]

export const ThirdTable = () => {
  return (
    <TableView<ThirdTableItem>
      columns={columns}
      fakeItems={thirdTableItems}
      actions={Actions}
    />
  )
}
