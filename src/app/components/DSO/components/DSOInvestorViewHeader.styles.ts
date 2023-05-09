import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(5),
    borderRadius: theme.spacing(1)
  },
  grid: {
    // border: '1px solid red'
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '0 !important'
  },
  details: {
    paddingLeft: '0 !important',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      alignItems: 'center'
    }
  }
}))
