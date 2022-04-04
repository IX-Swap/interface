import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  loader: {
    '.MuiCircularProgress-colorPrimary': {
      color: theme?.palette?.input?.placeholder
    }
  }
}))
