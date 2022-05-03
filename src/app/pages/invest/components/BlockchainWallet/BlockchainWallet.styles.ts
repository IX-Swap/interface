import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  label: {
    color: theme.palette.mode === 'light' ? '#666666' : '#ffffff'
  },
  addressBlock: {
    color: theme.palette.primary.main
  }
}))
