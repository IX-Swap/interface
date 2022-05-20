import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: 520
  },
  firstText: {
    fontSize: 16,
    fontWeight: 400,
    margin: theme.spacing(2, 0, 5),
    opacity: 0.8
  },
  secondText: {
    opacity: 0.8,
    fontWeight: 400,
    marginBottom: theme.spacing(2)
  },
  icon: {
    maxWidth: '100%'
  }
}))
