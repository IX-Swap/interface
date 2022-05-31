import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  checkbox: {
    marginLeft: theme.spacing(-1.125),
    marginRight: 0,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(2)
  },
  label: {
    color: theme.palette.text.secondary
  }
}))
