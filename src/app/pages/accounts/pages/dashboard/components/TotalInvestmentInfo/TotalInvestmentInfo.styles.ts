import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'block',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 'initial',
    marginTop: 0,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'flex',
      marginTop: theme.spacing(5)
    }
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    textDecoration: 'none',
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: {
      marginTop: 0
    },
    '&:hover': {
      opacity: 0.6,
      textDecoration: 'none'
    }
  },
  buttonText: {
    fontWeight: 500
  },
  label: {
    fontWeight: 500,
    fontSize: theme.spacing(2)
  }
}))
