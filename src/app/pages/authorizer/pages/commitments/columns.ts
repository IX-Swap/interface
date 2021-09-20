import { TableColumn } from 'types/util'
import { Commitment } from 'types/commitment'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAmount } from 'helpers/tables'
import {
  renderDealStatus,
  renderStatusColumn
} from 'app/pages/authorizer/hooks/useAuthorizerView'

export const columns: Array<TableColumn<Commitment>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'dso.tokenName',
    label: 'Digital Security'
  },
  {
    key: 'dso.capitalStructure',
    label: 'Capital Structure'
  },
  {
    key: 'dso.status',
    label: 'DSO Status',
    render: renderDealStatus
  },
  {
    key: 'totalAmount',
    label: 'Invested Amount',
    align: 'right',
    headAlign: 'right',
    render: renderAmount
  },
  {
    key: 'fundStatus',
    label: 'Status',
    render: renderStatusColumn
  }
]
