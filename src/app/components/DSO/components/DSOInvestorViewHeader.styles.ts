import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      alignItems: 'flex-start'
    }
  },
  logoContainer: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      alignItems: 'center'
    }
  },
  tokenName: {
    fontSize: 40,
    [theme.breakpoints.down('lg')]: {
      fontSize: 14
    }
  },
  corporateName: {
    fontWeight: 400,
    opacity: 0.7,
    [theme.breakpoints.down('lg')]: {
      fontSize: 14
    }
  }
}))
