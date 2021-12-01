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
import { Account } from 'types/reports'
import { FeesRow } from 'app/pages/accounts/pages/reports/components/FeesTable/FeesRow'

export interface FeesTableProps {
  accounts: Account[]
  total: number
}

export const createRow = (
  createdAt: string,
  description: string,
  amount: number | string
) => {
  return {
    createdAt,
    description,
    amount: amount
  }
}

export const FeesTable = ({ accounts, total }: FeesTableProps) => {
  const classes = useStyles({})

  const headCells = [
    { label: 'Date', align: 'left' },
    { label: 'Description', align: 'center' },
    { label: 'Amount', align: 'left' }
  ]

  const rows = [
    // TODO Add other fees amount after complete backend api
    createRow('', 'Other Fees', ''),
    ...accounts,
    createRow('Total', '', total)
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
          {rows.map((row, i) => (
            <FeesRow
              row={row}
              rowsLength={rows.length}
              index={i}
              key={row.description}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
