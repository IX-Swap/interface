import { formatAmount } from 'helpers/numbers'
import { renderMarketType } from 'helpers/rendering'

export const columns = [
  {
    label: 'Pair',
    key: 'tokenSymbol'
  },
  {
    label: 'Name',
    key: 'tokenName'
  },
  {
    label: 'Status',
    key: 'status'
  },
  {
    label: 'Minimum Trade',
    key: 'minimumTradeUnits',
    render: formatAmount
  },
  {
    label: 'Max Trade',
    key: 'maximumTradeUnits',
    render: formatAmount
  },
  {
    label: 'Available Market',
    key: 'marketType',
    render: renderMarketType
  }
]
