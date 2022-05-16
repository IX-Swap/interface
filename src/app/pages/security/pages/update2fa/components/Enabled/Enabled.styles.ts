import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0, 0, 8),

    [theme.breakpoints.down('md')]: {
      padding: 0
    }
  },
  text: {
    margin: theme.spacing(2, 'auto', 12.25),
    fontSize: 16,
    opacity: 0.8,
    maxWidth: 484,

    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(3, 'auto', 5)
    }
  },
  icon: {
    maxWidth: '100%'
  }
}))
