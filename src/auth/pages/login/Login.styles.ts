import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    fontSize: 40,
    color: theme.palette.text.primary,
    textTransform: 'uppercase'
  },
  link: {
    color: theme.palette.text.primary
  },
  forgotLink: {
    position: 'relative',
    color: theme.palette.text.primary,
    opacity: 0.5,
    textTransform: 'uppercase',
    top: -8
  },
  text: {
    color: '#ffffff20'
  }
}))
