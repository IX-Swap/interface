import { formatMoney } from 'helpers/numbers'
import { TableColumn } from 'types/util'
import { getUserNameById } from 'helpers/tables'

export interface Order {
  createdAt: string
  pair: string
  side: string
  price: number
  amount: number
  total: number
  filled: number
}

export const columns: Array<TableColumn<any>> = [
  {
    key: '',
    label: ''
  },
  {
    key: 'name',
    label: 'Pair'
  },
  {
    label: 'Symbol',
    key: 'listing.tokenSymbol'
  },
  {
    key: 'listing.tokenName',
    label: 'Name'
  },
  {
    key: 'listing.createdBy',
    label: 'Issued By',
    align: 'center',
    headAlign: 'center',
    render: (_, value) => getUserNameById(value.listing.createdBy)
  },

  {
    key: 'listing.minimumTradeUnits',
    label: 'Price',
    align: 'right',
    headAlign: 'right',
    render: (_, value) => formatMoney(value.listing.minimumTradeUnits, '')
  },
  {
    key: '',
    label: ''
  },
  {
    key: 'listing.marketType',
    label: 'Type'
  }
]
