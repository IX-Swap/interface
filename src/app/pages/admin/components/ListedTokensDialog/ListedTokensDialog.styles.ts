import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      borderRadius: 5,
      margin: '2rem',
      padding: theme.spacing(3),
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
    textTransform: 'none',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0
  },
  list: {
    backgroundColor: theme.palette.backgrounds.light,
    height: 340,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    overflow: 'scroll'
  },
  item: {
    backgroundColor: theme.palette.backgrounds.default,
    border: '1px solid #EEEEEE',
    borderRadius: 4,
    padding: theme.spacing(1),
    marginRight: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    fontSize: 14,
    color: theme.palette.mode === 'light' ? '#666666' : '#ffffff'
  }
}))
