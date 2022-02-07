import makeStyles from '@mui/styles/makeStyles'

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
