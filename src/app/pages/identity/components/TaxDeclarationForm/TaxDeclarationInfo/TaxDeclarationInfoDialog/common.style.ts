import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  actionButton: {
    width: '100%'
  },
  triggerButtonWrapper: {
    minWidth: 'max-content'
  },
  triggerButton: {
    textDecoration: 'none',
    cursor: 'pointer',
    marginLeft: 20
  },
  content: {
    color: theme.palette.dialog.content
  }
}))
