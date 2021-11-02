import { TableCell, TableCellProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

export interface Props {
  transaction?: 'BID' | 'ASK'
}

export const useStyles = makeStyles(theme => {
  const getPriceColor = (transaction?: string) => {
    if (transaction === undefined) {
      return undefined
    }
    if (transaction === 'ASK') {
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
  transaction?: 'BID' | 'ASK'
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
