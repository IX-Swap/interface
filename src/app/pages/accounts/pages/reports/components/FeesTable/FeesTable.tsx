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
import { TableCellItem } from 'types/table'

export interface FeesTableProps {
  accounts: Account[]
  total: number
}

export interface FeeRowData {
  createdAt: string
  description: string
  amount: string | number
}

export const FeesTable = ({ accounts, total }: FeesTableProps) => {
  const classes = useStyles({})

  const headCells: TableCellItem[] = [
    { label: 'Date', align: 'left' },
    { label: 'Description', align: 'center' },
    { label: 'Amount', align: 'left' }
  ]

  const rows: FeeRowData[] = [
    { createdAt: '', description: 'Other Fees', amount: '' },
    ...accounts,
    { createdAt: 'Total', description: '', amount: total }
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
