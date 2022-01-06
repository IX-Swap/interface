import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { TradesRow } from 'app/pages/accounts/pages/reports/components/TradesTable/TradesRow'
import React from 'react'
import { TradeItem } from 'types/reports'
import { useStyles } from '../shared.styles'

export interface TradesTableProps {
  data: TradeItem[]
  hideFee?: boolean
}

export interface TradeRowData {
  pair: string
  createdAt: string
  type: string
  quantity: number | string
  price: number | string
  total: number | string
  fee: number | string
}

export const headCells = [
  { label: '', align: 'left' },
  { label: 'Date', align: 'left' },
  { label: 'Type', align: 'left' },
  { label: 'Quantity', align: 'right' },
  { label: 'Price', align: 'right' },
  { label: 'Total', align: 'right' }
]
export const TradesTable = ({ data }: TradesTableProps) => {
  const classes = useStyles({})
  const rows: TradeRowData[] = [
    {
      pair: 'Securities Pair',
      createdAt: '',
      type: '',
      quantity: '',
      price: '',
      total: '',
      fee: ''
    },
    ...data
  ]

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
