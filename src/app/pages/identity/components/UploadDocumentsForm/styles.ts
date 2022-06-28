import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    lineHeight: '160%',
    fontSize: '14px',
    letterSpacing: '-0.01em',
    textTransform: 'capitalize'
  },
  blackText: { color: theme.palette.text.primary }
}))
