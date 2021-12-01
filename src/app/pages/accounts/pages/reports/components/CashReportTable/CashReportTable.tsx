import React from 'react'
import { Table, TableBody, TableContainer } from '@material-ui/core'
import { CashReports } from 'types/reports'
import { CashReportRow } from 'app/pages/accounts/pages/reports/components/CashReportTable/CashReportRow'

export interface CashReportTableProps {
  data: CashReports[]
}

export enum CashReportLabels {
  startingCash = 'Starting cash',
  fees = 'Other Fees',
  withdrawals = 'Withdrawals',
  endingCash = 'Ending Cash'
}

export const createRow = (currency: string, total: string) => {
  return {
    currency,
    total
  }
}

export const CashReportTable = ({ data }: CashReportTableProps) => {
  const rows = [
    ...data.map(({ currency, _id, ...item }) => [
      createRow(currency, 'Total'),
      ...Object.entries(item).map(([key, value]) =>
        // @ts-ignore
        createRow(CashReportLabels[key], value)
      )
    ])
  ]

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {rows.map(item =>
            item.map((row, i) => (
              <CashReportRow index={i} row={row} key={row.total} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
