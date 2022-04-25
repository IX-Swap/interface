import makeStyles from '@mui/styles/makeStyles'
import { TradesTableCellProps } from 'app/pages/invest/components/Trades/TradesTablecell'
import { OrderSide } from 'types/order'

export const useStyles = makeStyles(theme => {
  const getPriceColor = (transaction?: string) => {
    if (transaction === undefined) {
      return undefined
    }
    if (transaction === OrderSide.ASK) {
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
