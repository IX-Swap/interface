import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { useStyles } from '../shared.styles'
import { Dividend } from 'types/reports'
import { DividendsRow } from 'app/pages/accounts/pages/reports/components/DividendsTable/DividendsRow'

export interface DividendsTableProps {
  data: Dividend[]
}

export const DividendsTable = ({ data }: DividendsTableProps) => {
  const classes = useStyles({})

  const headCells = [
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
              <TableCell align={align as any} className={classes.headColumn}>
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
