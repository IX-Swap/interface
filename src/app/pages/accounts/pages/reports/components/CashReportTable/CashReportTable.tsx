import React from 'react'
import { Table, TableBody, TableContainer } from '@material-ui/core'
import { CashReports } from 'types/reports'
import { CashReportRow } from 'app/pages/accounts/pages/reports/components/CashReportTable/CashReportRow'

export interface CashReportTableProps {
  data: CashReports[]
}

type LabelKeys = keyof Omit<CashReports, '_id' | 'currency'>

export const cashReportLabelsMap: Record<
  keyof Omit<CashReports, '_id' | 'currency'>,
  string
> = {
  startingCash: 'Starting cash',
  fees: 'Other Fees',
  withdrawals: 'Withdrawals',
  endingCash: 'Ending Cash'
}

export interface CashRowData {
  currency: string
  total: string
}

export const CashReportTable = ({ data }: CashReportTableProps) => {
  const rows = [
    ...data.map(({ currency, _id, ...item }) => [
      { currency: currency, total: 'Total' },
      ...Object.entries(item as CashReports).map(([key, value]) => ({
        currency: cashReportLabelsMap[key as LabelKeys],
        total: value
      }))
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
