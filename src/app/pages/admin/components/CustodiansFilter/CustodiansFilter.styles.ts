import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      paddingBottom: theme.spacing(1)
    }
  },
  item: {
    paddingRight: 0,
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(3)
    }
  },
  text: {
    fontWeight: 600
  }
}))
