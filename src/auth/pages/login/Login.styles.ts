import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    fontSize: 40,
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    fontFamily: 'Monument Extended, sans-serif'
  },
  link: {
    color: theme.palette.text.primary
  },
  forgotLink: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.primary,
    opacity: 0.5,
    textTransform: 'uppercase'
  },
  text: {
    color: '#ffffff50'
  }
}))
