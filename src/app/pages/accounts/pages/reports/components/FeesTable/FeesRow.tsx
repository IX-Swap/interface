import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { useStyles } from '../shared.styles'
import { formatReportsDateAndTime } from 'helpers/dates'
import { formatAmountValue } from 'helpers/numbers'
import { FeeRowData } from 'app/pages/accounts/pages/reports/components/FeesTable/FeesTable'

export interface FeesRowProps {
  rowsLength: number
  row: FeeRowData
  index: number
}

export const FeesRow = ({ row, rowsLength, index }: FeesRowProps) => {
  const classes = useStyles({ rowIdx: index, rowsLength: rowsLength })

  return (
    <TableRow key={row.createdAt} className={classes.row}>
      <TableCell component='th' scope='row' className={classes.column}>
        {formatReportsDateAndTime(row.createdAt)}
      </TableCell>
      <TableCell align='left' className={classes.column}>
        {row.description}
      </TableCell>
      <TableCell align='right' className={classes.column}>
        {formatAmountValue(row.amount)}
      </TableCell>
    </TableRow>
  )
}
