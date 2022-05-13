import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  info: {
    margin: theme.spacing(5, 0, 5),
    width: '100%',
    maxWidth: '532px!important'
  },
  formBlock: {
    maxWidth: '532px!important',
    width: '100%'
  },
  description: {
    marginTop: theme.spacing(2),
    width: '100%',
    fontSize: 16,
    opacity: 0.8
  }
}))
