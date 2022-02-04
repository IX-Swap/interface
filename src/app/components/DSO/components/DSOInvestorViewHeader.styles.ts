import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      alignItems: 'flex-start'
    }
  },
  logoContainer: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center'
    }
  },
  tokenName: {
    fontSize: 40,
    [theme.breakpoints.down('md')]: {
      fontSize: 14
    }
  },
  corporateName: {
    fontWeight: 400,
    opacity: 0.7,
    [theme.breakpoints.down('md')]: {
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
