import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  helperText: {
    //
    color: '#3B4251',
    marginTop: 12,
    opacity: 0.8,
    fontWeight: 400
  },
  label: {
    margin: theme.spacing(5, 0, 1.5)
  },
  button: {
    marginTop: theme.spacing(3),
    width: '100%'
  }
}))
