import { formatDateToMMDDYY } from 'helpers/dates'
import { FinancialReport } from 'types/financitalReport'
import { TableColumn } from 'types/util'

export const renderInterval = (val: any, row: FinancialReport) => {
  return `${formatDateToMMDDYY(row.dateFrom)} - ${formatDateToMMDDYY(
    row.dateTo
  )}`
}

export const renderType = (val: any, row: FinancialReport) => {
  return (
    row.reportDocuments[0]?.originalFileName.split('.').pop()?.toUpperCase() ??
    ''
  )
}

export const renderReportOf = (val: any, row: FinancialReport) => {
  return row.dso.tokenName
}

export const columns: Array<TableColumn<FinancialReport>> = [
  {
    key: 'createdAt',
    label: 'Creation Date',
    render: formatDateToMMDDYY
  },
  {
    key: 'dateFrom',
    label: 'Report Interval',
    render: renderInterval
  },
  {
    key: 'reportDocuments',
    label: 'Type',
    render: renderType
  },
  {
    key: 'dso',
    label: 'Report of',
    render: renderReportOf
  }
]
