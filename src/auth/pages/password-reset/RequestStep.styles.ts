import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    fontSize: 40,
    lineHeight: 1.2,
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    fontFamily: 'Monument Extended, sans-serif'
  },
  subtitle: {
    color: '#ffffff',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center'
  }
}))
