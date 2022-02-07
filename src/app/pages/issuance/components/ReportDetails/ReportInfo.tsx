import React from 'react'
import {
  TableBody,
  TableContainer,
  Typography,
  TableRow
} from '@material-ui/core'
import { TableCell } from 'app/pages/issuance/components/ReportDetails/TableCell'
import { Table } from 'app/pages/issuance/components/ReportDetails/Table'
import { FinancialReport } from 'types/financitalReport'
import { formatDateToMMDDYY } from 'helpers/dates'

export interface ReportInfoProps {
  report: FinancialReport
}

export const ReportInfo = ({ report }: ReportInfoProps) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant='body1'>Launch Date:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle1'>
                {formatDateToMMDDYY(report.dso.launchDate)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='body1'>Net Asset Value(NAV):</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle1'>{report.nav}$</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='body1'>Reporting Date:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle1'>
                {formatDateToMMDDYY(report.dateFrom)} -{' '}
                {formatDateToMMDDYY(report.dateTo)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
