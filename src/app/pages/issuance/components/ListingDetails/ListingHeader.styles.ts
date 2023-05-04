import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(5),
    borderRadius: theme.spacing(1)
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
  },
  status: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    [theme.breakpoints.up('md')]: {
      alignItems: 'end',
      justifyContent: 'space-between',
      marginTop: 0
    }
  }
}))
