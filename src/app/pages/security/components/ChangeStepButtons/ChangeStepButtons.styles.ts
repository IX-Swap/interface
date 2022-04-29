import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 'calc(100% - 316px)',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  firstButton: {
    marginRight: theme.spacing(2)
  },
  button: {
    width: 140,
    height: 49
  }
}))
