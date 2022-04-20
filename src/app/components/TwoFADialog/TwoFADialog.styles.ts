import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
    maxWidth: 360,
    borderRadius: 16
  },
  closeBtn: {
    position: 'absolute',
    top: 4,
    right: 4
  },
  title: {
    padding: 0,
    textAlign: 'center'
  },
  content: {
    padding: theme.spacing(2.5, 0, 0)
  },
  contentItem: {
    marginTop: theme.spacing(2.5)
  },
  actions: {
    padding: 0
  }
}))
