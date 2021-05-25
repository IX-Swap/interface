import { formatAmount } from 'helpers/numbers'

export const columns = [
  {
    label: 'Pair',
    key: 'asset.name'
  },
  {
    label: 'Name',
    key: 'name'
  },
  {
    label: 'Status',
    key: 'status'
  },
  {
    label: 'Minimum Trade',
    key: 'minTrade',
    render: formatAmount
  },
  {
    label: 'Max Trade',
    key: 'maxTrade',
    render: formatAmount
  },
  {
    label: 'Available Market',
    key: 'amount'
  }
  // {
  //   label: '',
  //   key: '_id'
  //   // render: renderLaunchButton
  // }
]
