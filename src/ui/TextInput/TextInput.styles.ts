import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  root: {
    background: 'transparent'
  },
  loader: {
    '.MuiCircularProgress-colorPrimary': {
      color: theme?.palette?.input?.placeholder
    }
  },
  disabled: {
    '&.MuiInputBase-root': {
      backgroundColor: theme?.palette.input?.disabledBg
    }
  }
}))
