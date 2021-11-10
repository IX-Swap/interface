import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  firstItem: {
    paddingBottom: 0,
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(1),
      paddingRight: 0
    }
  },
  secondItem: {
    paddingBottom: 0,
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(2),
      paddingRight: 0
    }
  },
  text: {
    fontWeight: 600
  }
}))
