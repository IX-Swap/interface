import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  root: { color: theme.palette.text.disabled },
  active: {
    color: theme.palette.text.primary
  }
}))
