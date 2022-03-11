import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  firstItem: {
    paddingBottom: 0,
    paddingRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(1),
      paddingRight: 0
    }
  },
  secondItem: {
    paddingBottom: 0,
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(2),
      paddingRight: 0
    }
  },
  text: {
    fontWeight: 600
  }
}))
