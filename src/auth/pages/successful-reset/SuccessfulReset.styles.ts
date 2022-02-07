import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'block',
    textAlign: 'center'
  },
  title: {
    fontWeight: 700,
    fontSize: 40,
    color: theme.palette.text.primary,
    textTransform: 'uppercase'
  },
  description: {
    display: 'block',
    margin: theme.spacing(0, 'auto'),
    maxWidth: 280,
    color: theme.palette.text.primary
  }
}))
