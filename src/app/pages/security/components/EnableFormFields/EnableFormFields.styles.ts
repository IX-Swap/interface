import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  button: {
    maxWidth: 484,
    width: '100%',
    marginTop: theme.spacing(23),

    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(5)
    }
  },
  errorMessage: {
    fontSize: 12,
    color: '#F56283',
    marginTop: theme.spacing(3)
  }
}))
