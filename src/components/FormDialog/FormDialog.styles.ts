import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  title: {
    margin: 0,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '1.25em',
    textAlign: 'center',
    position: 'relative',
    fontWeight: 600
  },
  content: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10)
  },
  noPaddingContent: {
    padding: 0
  },
  actions: {
    justifyContent: 'center',
    margin: 0,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6)
  },
  closeButton: {
    position: 'absolute',
    right: 14,
    top: 14
  },
  closeIcon: {
    fill: '#fff'
  }
}))
