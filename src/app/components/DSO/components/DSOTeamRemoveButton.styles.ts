import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.button.bgLight,
    borderRadius: 8,
    '& svg': {
      fill: theme.palette.info.main
    }
  }
}))
