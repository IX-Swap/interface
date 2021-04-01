import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: { color: theme.palette.text.disabled },
  active: {
    color: theme.palette.text.primary
  }
}))
