import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'block',
    textAlign: 'center'
  },
  title: {
    fontWeight: 700,
    fontSize: 40,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase'
  },
  description: {
    display: 'block',
    margin: theme.spacing(0, 'auto'),
    color: theme.palette.text.primary
  },
  text: {
    display: 'block',
    margin: theme.spacing(0, 'auto'),
    color: theme.palette.text.primary
  },
  link: {
    color: theme.palette.text.secondary
  },
  customButton: {
    backgroundColor: '#0C469C',
    color: '#FFFFFF',
    width: '8rem',
    height: '3rem',
    padding: '0.5rem',
    fontSize: '0.8rem',
    lineHeight: '1rem',
    fontWeight: 700
  }
}))
