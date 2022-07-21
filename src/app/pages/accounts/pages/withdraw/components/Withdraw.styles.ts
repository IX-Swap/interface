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
  }
}))
