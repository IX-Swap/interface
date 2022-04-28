import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  info: {
    margin: theme.spacing(5, 0, 7),
    width: '100%',
    maxWidth: '532px!important'
  },
  button: {
    width: '100%',
    maxWidth: 484,
    marginTop: theme.spacing(13.75)
  },
  formBlock: {
    maxWidth: '532px!important',
    width: '100%'
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    width: '100%',
    fontSize: 16,
    opacity: 0.8
  },
  icon: {
    width: '100%',
    maxWidth: 484
  }
}))
