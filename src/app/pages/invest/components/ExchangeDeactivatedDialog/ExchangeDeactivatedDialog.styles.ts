import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  content: {
    padding: theme.spacing(5, 8),
    marginTop: theme.spacing(5)
  },
  dialog: {},
  createDialog: {},
  titleRoot: {
    margin: 0,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '1.25em',
    textAlign: 'center'
  },
  title: {
    fontWeight: 600
  },
  closeButton: {
    position: 'absolute',
    top: '0.2rem',
    right: '0.2rem',
    display: 'inline-block'
  }
}))
