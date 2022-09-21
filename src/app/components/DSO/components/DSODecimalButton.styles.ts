import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.button.bgLight,
    borderRadius: 8,

    '&:disabled': {
      backgroundColor: theme.palette.secondary.light
    },
    '& svg': {
      fill: theme.palette.info.main
    }
  }
}))
