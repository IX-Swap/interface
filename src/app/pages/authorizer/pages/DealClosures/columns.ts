import { TableColumn } from 'types/util'
import { formatDateToMMDDYY } from 'helpers/dates'
import {
  renderClosureAmount,
  renderClosureMinimumInvestment
} from 'helpers/tables'
import { Closure } from 'app/pages/authorizer/pages/DealClosures/DealClosures'

export const columns: Array<TableColumn<Closure>> = [
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
    align: 'right',
    headAlign: 'right',
    key: 'dso.pricePerUnit',
    label: 'Unit Price',
    render: renderClosureAmount
  },
  {
    align: 'right',
    headAlign: 'right',
    key: 'dso.minimumInvestment',
    label: 'Minimum Investment',
    render: renderClosureMinimumInvestment
  }
]
