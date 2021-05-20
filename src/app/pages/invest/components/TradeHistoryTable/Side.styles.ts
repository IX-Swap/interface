import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  sideColor: {
    color: (props: any) =>
      props.side === 'BID'
        ? theme.palette.error.main
        : theme.palette.success.main
  }
}))
