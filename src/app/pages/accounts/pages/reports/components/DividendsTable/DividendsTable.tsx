import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { useStyles } from '../shared.styles'
import { Dividend } from 'types/reports'
import { DividendsRow } from 'app/pages/accounts/pages/reports/components/DividendsTable/DividendsRow'
import { TableCellItem } from 'types/table'

export interface DividendsTableProps {
  data: Dividend[]
}

export const DividendsTable = ({ data }: DividendsTableProps) => {
  const classes = useStyles({})

  const headCells: TableCellItem[] = [
    { label: 'Date', align: 'left' },
    { label: 'Token', align: 'left' },
    { label: 'Dividend Per Share', align: 'left' },
    { label: 'Number of Token', align: 'left' },
    { label: 'Total Amount', align: 'right' }
  ]

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map(({ label, align }) => (
              <TableCell align={align} className={classes.headColumn}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <DividendsRow row={row} key={row.numberOfToken} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
