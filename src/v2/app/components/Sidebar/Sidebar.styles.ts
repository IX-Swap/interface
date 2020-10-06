import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    border: `1px solid ${theme.palette.divider}`,
    marginTop: 64,
    width: 90,
    boxShadow: theme.shadows[2]
  }
}))
