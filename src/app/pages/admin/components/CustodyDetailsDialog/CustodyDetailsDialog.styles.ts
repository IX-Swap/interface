import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      borderRadius: 5,
      margin: '2rem',
      width: 'max-content',
      padding: theme.spacing(2.5),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      height: 'auto'
    }
  },
  titleRoot: {
    position: 'relative',
    paddingTop: 0,
    paddingBottom: 0.5,
    textAlign: 'center'
  },
  title: {
    fontWeight: 500,
    textTransform: 'none'
  },
  contentWrapper: {
    padding: 0
  },
  content: {
    overflowY: 'scroll',
    backgroundColor:
      theme.palette.type === 'light'
        ? '#FAFAFA'
        : theme.palette.getContrastText('#FAFAFA'),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    fontSize: 16,
    color: theme.palette.type === 'light' ? '#666666' : '#ffffff',
    maxHeight: 376
  },
  actions: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center'
  }
}))
