import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  title: {
    color: theme.palette.otpInput.color
  },
  labelText: {
    color: theme.palette.text.secondary,
    fontSize: '14px!important',
    lineHeight: 1.5,
    marginTop: '8px!important'
  }
}))
