import { makeStyles } from '@material-ui/core/styles'
import { TradesTableCellProps } from 'app/pages/exchange/components/Trades/TradesTablecell'

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
      color: (props: TradesTableCellProps) => getPriceColor(props.transaction)
    }
  }
})
