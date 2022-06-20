import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(5)
  },
  content: {
    overflowY: 'initial',
    padding: 0,
    margin: theme.spacing(2, 0, 3)
  },
  title: {
    position: 'relative',
    padding: theme.spacing(3, 0, 0)
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer'
  },
  actions: {
    padding: 0
  }
}))
