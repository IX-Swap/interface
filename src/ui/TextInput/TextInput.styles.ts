import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  loader: {
    '.MuiCircularProgress-colorPrimary': {
      color: theme?.palette?.input?.placeholder
    }
  },
  disabled: {
    '&.MuiTextField-root': {
      backgroundColor: theme?.palette.input?.disabledBg
    }
  }
}))
