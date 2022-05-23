import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  container: {},
  text: {
    fontSize: 16,
    opacity: 0.8,
    margin: theme.spacing(2, 0, 23),

    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(3, 0, 5)
    }
  }
}))
