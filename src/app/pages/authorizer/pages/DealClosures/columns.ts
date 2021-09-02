import { TableColumn } from 'types/util'
import { DigitalSecurityOffering } from 'types/dso'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderAmount, renderMinimumInvestment } from 'helpers/tables'

export const columns: Array<TableColumn<DigitalSecurityOffering>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: formatDateToMMDDYY
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
