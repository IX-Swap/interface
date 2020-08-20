import { TableColumn } from 'v2/types/util'
import { Dso } from 'v2/types/dso'
import { convertStringToMMDDYY } from 'v2/helpers/dates'
import { renderAmount, renderMinimumInvestment } from 'v2/helpers/tables'

export const columns: Array<TableColumn<Dso>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: convertStringToMMDDYY
  },
  {
    key: 'tokenName',
    label: 'Digital Security'
  },
  {
    key: 'capitalStructure',
    label: 'Capital Structure'
  },
  {
    align: 'right',
    headAlign: 'right',
    key: 'pricePerUnit',
    label: 'Unit Price',
    render: renderAmount
  },
  {
    align: 'right',
    headAlign: 'right',
    key: 'minimumInvestment',
    label: 'Minimum Investment',
    render: renderMinimumInvestment
  }
]
