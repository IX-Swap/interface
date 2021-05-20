import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  sideColor: {
    color: (props: any) =>
      props.side === 'SELL'
        ? theme.palette.error.main
        : theme.palette.success.main
  }
}))
