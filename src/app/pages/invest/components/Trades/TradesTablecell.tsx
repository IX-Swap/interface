import { TableCell, TableCellProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

export interface Props {
  transaction?: 'buy' | 'sell'
}

export const useStyles = makeStyles(theme => {
  const getPriceColor = (transaction?: string) => {
    if (transaction === undefined) {
      return undefined
    }
    if (transaction === 'sell') {
      return theme.palette.error.main
    }
    return theme.palette.success.main
  }
  return {
    tableCell: {
      borderBottom: '1px solid transparent',
      paddingTop: 0,
      paddingBottom: 0,
      color: (props: Props) => getPriceColor(props.transaction)
    }
  }
})

export interface TradesTableCellProps extends TableCellProps {
  transaction?: 'buy' | 'sell'
}

export const TradesTableCell = ({
  children,
  transaction,
  ...rest
}: TradesTableCellProps) => {
  const { tableCell } = useStyles({ transaction })
  return (
    <TableCell className={tableCell} {...rest}>
      {children}
    </TableCell>
  )
}
