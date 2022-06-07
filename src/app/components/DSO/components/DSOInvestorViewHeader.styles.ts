import makeStyles from '@mui/styles/makeStyles'

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
    color: theme.palette.switch.color,
    [theme.breakpoints.down('lg')]: {
      fontSize: 14
    }
  },
  corporateName: {
    fontWeight: 400,
    opacity: 0.7,
    color: theme.palette.switch.color,
    [theme.breakpoints.down('lg')]: {
      fontSize: 14
    }
  },
  boxContainer: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    padding: theme.spacing(5),
    borderRadius: theme.spacing(6)
  }
}))
