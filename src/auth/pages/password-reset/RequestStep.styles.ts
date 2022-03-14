import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    fontSize: 40,
    color: theme.palette.text.primary,
    textTransform: 'uppercase'
  },
  subtitle: {
    color: '#ffffff',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center'
  }
}))
