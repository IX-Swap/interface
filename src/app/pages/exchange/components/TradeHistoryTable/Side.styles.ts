import { makeStyles } from '@material-ui/core/styles'
import { OrderSide } from 'types/order'

export const useStyles = makeStyles(theme => ({
  sideColor: {
    color: (props: any) =>
      props.side === OrderSide.BID
        ? theme.palette.success.main
        : theme.palette.error.main
  }
}))
