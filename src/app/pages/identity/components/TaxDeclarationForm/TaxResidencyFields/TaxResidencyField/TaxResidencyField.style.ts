import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {},
  block: {
    width: 'calc(50% - 44px)',
    marginRight: theme.spacing(2.5)
  },
  buttonBlock: {
    marginTop: theme.spacing(3)
  },
  deleteButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F7F9FA!important',
    borderRadius: 8
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}))
