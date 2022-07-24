import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      overflowX: 'hidden'
    }
  },
  formWrapper: {
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  headerContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(2.5)
    }
  }
}))
