import React from 'react'
import { columns } from './columns'
import { Actions } from './Actions'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'

export interface SecondTableItem {
  pair: string
  symbol: string
  name: string
  issuedBy: string
  type: string
  price: string
}

export const secondTableItems: SecondTableItem[] = [
  {
    pair: 'PPC/SGD',
    symbol: 'PPC',
    name: 'Pied Piper Coin',
    issuedBy: 'Pied Piper Inc',
    type: 'Exchange',
    price: '102.97'
  },
  {
    pair: 'IXPS/SGD',
    symbol: 'IXPS',
    name: 'InvestaX Preferred Stock',
    issuedBy: 'InvestaX',
    type: 'OTC',
    price: '100.00'
  },
  {
    pair: 'SBC/USD',
    symbol: 'SBC',
    name: 'Square Block Coin',
    issuedBy: 'Square Block',
    type: 'OTC',
    price: '200.00'
  },
  {
    pair: 'NX/USD',
    symbol: 'NX',
    name: 'NeuronX',
    issuedBy: 'Neurologit Labs',
    type: 'Exchange',
    price: '50.00'
  },
  {
    pair: 'HT/SGD',
    symbol: 'HT',
    name: 'Hamilton Tokens',
    issuedBy: 'Hamilton Enterprises',
    type: 'OTC',
    price: '150.00'
  }
]

export const SecondTable = () => {
  return (
    <TableView<SecondTableItem>
      columns={columns}
      fakeItems={secondTableItems}
      actions={Actions}
    />
  )
}
