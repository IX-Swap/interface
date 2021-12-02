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
import { TradeItem } from 'types/reports'
import { TradesRow } from 'app/pages/accounts/pages/reports/components/TradesTable/TradesRow'

export interface TradesTableProps {
  data: TradeItem[]
}

export const createRow = (pair: string) => {
  return {
    pair: pair,
    createdAt: '',
    type: '',
    quantity: '',
    price: '',
    total: '',
    fee: ''
  }
}

export const headCells = [
  { label: '', align: 'left' },
  { label: 'Date', align: 'left' },
  { label: 'Type', align: 'left' },
  { label: 'Quantity', align: 'right' },
  { label: 'Price', align: 'right' },
  { label: 'Total', align: 'right' },
  { label: 'Fee', align: 'right' }
]

export const TradesTable = ({ data }: TradesTableProps) => {
  const classes = useStyles({})

  const rows = [createRow('Securities Pair'), ...data]

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map(({ label, align }) => (
              <TableCell
                align={align as any}
                className={classes.headColumn}
                data-testid={'cell'}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TradesRow row={row} index={i} key={row.pair} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
