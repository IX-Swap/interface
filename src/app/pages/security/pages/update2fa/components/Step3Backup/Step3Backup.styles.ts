import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {
    maxWidth: 484,
    textAlign: 'center'
  },
  text: {
    margin: theme.spacing(2, 0, 27),
    fontSize: 16,
    opacity: 0.8
  },
  secondText: {
    marginTop: theme.spacing(27),
    opacity: 0.8
  }
}))
