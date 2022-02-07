import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import { useStyles } from './shared.styles'
import { formatAmountValue } from 'helpers/numbers'

export interface TopInvestorsRowProps {
  subFund: string
  name: string
  amount: number
}

export const TopInvestorsRow = ({
  subFund,
  name,
  amount
}: TopInvestorsRowProps) => {
  const classes = useStyles()

  return (
    <TableRow key={name}>
      <TableCell
        component='th'
        scope='row'
        align={'left'}
        className={classes.column}
      >
        {subFund}
      </TableCell>
      <TableCell
        component='th'
        scope='row'
        align={'left'}
        className={classes.column}
      >
        {name}
      </TableCell>
      <TableCell
        component='th'
        scope='row'
        align={'right'}
        className={classes.column}
      >
        {formatAmountValue(amount)}
      </TableCell>
    </TableRow>
  )
}
