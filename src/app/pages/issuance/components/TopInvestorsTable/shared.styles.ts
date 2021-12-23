import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(3, 3, 0),
    height: '273px'
  },
  headColumn: {
    padding: theme.spacing(1, 3, 1, 0)
  },
  column: {
    padding: theme.spacing(1, 3, 1, 0)
  }
}))
