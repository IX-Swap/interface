import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    border: `1px solid ${theme.palette.divider}`,
    marginTop: 64,
    width: 90,
    boxShadow: theme.shadows[2],
    position: 'fixed',
    zIndex: 11,
    left: 0,
    top: 0,
    bottom: 0
  }
}))
