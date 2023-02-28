import { TableColumn } from 'types/util'
import { formatAmount } from 'helpers/numbers'
import { Commitment } from 'types/commitment'
import { renderStatusColumn } from 'app/pages/authorizer/hooks/useAuthorizerView'
import {
  renderCommitmentAvatar,
  renderCommitmentMoney
} from 'helpers/rendering'

export const columns: Array<TableColumn<Commitment>> = [
  {
    key: '_id',
    label: '',
    render: renderCommitmentAvatar
  },
  {
    key: 'dso.tokenSymbol',
    label: 'Name'
  },
  {
    key: 'pricePerUnit',
    label: 'Unit Price',
    align: 'right',
    headAlign: 'right',
    render: renderCommitmentMoney
  },
  {
    key: 'dso.capitalStructure',
    label: 'Capital Structure'
  },
  {
    key: 'totalAmount',
    label: 'Investment Amount',
    align: 'right',
    headAlign: 'right',
    render: renderCommitmentMoney
  },
  {
    key: 'numberOfUnits',
    label: 'Number of Security Tokens',
    align: 'right',
    headAlign: 'right',
    render: formatAmount
  },
  {
    key: 'status',
    label: 'Status',
    render: renderStatusColumn
  }
]

export default columns
