import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      borderRadius: 5,
      margin: theme.spacing(4),

      width: 'max-content',
      padding: theme.spacing(5),
      [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(2)
      },
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
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: -20,
    [theme.breakpoints.down('lg')]: {
      right: -4
    }
  }
}))
