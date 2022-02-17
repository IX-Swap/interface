import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0)
  }
}))
