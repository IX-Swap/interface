import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    borderRadius: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'left',
    textTransform: 'capitalize',
    padding: 0
  },
  content: {
    fontSize: 14,
    fontWeight: 'normal',
    letterSpacing: '0.04em',
    marginTop: theme.spacing(2),
    textAlign: 'left'
  },
  actions: {
    flexDirection: 'column',
    padding: 0
  },
  box: {
    display: 'flex',
    alignItems: 'center'
  },
  scrollable: {
    overflowY: 'scroll',
    maxHeight: 250
  },
  button: {
    textTransform: 'initial'
  }
}))
