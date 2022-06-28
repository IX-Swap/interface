import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  loader: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(10)
    }
  },
  buttonMobile: {
    textTransform: 'none',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    fontWeight: 400
  }
}))
