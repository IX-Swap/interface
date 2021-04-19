import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  text: {
    display: 'inline-block',
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(2)
  },
  input: {
    marginLeft: 'auto'
  }
}))
