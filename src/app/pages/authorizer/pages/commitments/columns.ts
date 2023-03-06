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
    label: 'Security Token'
  },
  {
    key: 'dso.capitalStructure',
    label: 'Capital Structure'
  },
  {
    key: 'dso.dealStatus',
    label: 'STO Status',
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
