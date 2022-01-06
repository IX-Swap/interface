import React, { useMemo } from 'react'
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
export const headCellsWithFee = [...headCells, { label: 'Fee', align: 'right' }]
export const TradesTable = ({ data, hideFee = false }: TradesTableProps) => {
  const classes = useStyles({})
  const cells = useMemo(
    () => (hideFee ? headCells : headCellsWithFee),
    [hideFee]
  )
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
            {cells.map(({ label, align }) => (
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
            <TradesRow row={row} index={i} key={row.pair} hideFee={hideFee} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
