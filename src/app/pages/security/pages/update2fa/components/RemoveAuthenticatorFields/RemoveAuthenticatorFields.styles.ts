import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  helperText: {
    color: theme.palette.text.primary,
    marginTop: 12,
    opacity: 0.8,
    fontWeight: 400
  },
  label: {
    margin: theme.spacing(5, 0, 1.5),
    color: theme.palette.select.label,
    opacity: 0.7
  },
  button: {
    marginTop: theme.spacing(3),
    width: '100%'
  }
}))
