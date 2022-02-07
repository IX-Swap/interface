import { Typography } from '@material-ui/core'
import { formatDateToMMDDYY } from 'helpers/dates'
import { FinancialReport } from 'types/financitalReport'
import { TableColumn } from 'types/util'
import React from 'react'

export const renderInterval = (val: any, row: FinancialReport) => {
  return (
    <Typography>
      {formatDateToMMDDYY(row.dateFrom)} - {formatDateToMMDDYY(row.dateTo)}
    </Typography>
  )
}

export const renderType = (val: any, row: FinancialReport) => {
  return (
    <Typography style={{ textTransform: 'uppercase' }}>
      {row.reportDocuments[0]?.originalFileName.split('.').pop() ?? ''}
    </Typography>
  )
}

export const renderReportOf = (val: any, row: FinancialReport) => {
  return <Typography>{row.dso.tokenName}</Typography>
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
