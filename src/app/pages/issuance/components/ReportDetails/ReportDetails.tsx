import React from 'react'
import {
  TableBody,
  TableContainer,
  Typography,
  TableCell
} from '@material-ui/core'
import { TableRow } from 'app/pages/issuance/components/ReportDetails/TableRow'
import { Table } from 'app/pages/issuance/components/ReportDetails/Table'

export const ReportDetails = () => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant='body1'>Launch Date:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle1'>01/02/2021</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='body1'>Net Asset Value(NAV):</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle1'>65$</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant='body1'>Reporting Date:</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='subtitle1'>
                12/29/2021 - 02/28/2022
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
