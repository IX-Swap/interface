import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  pairName: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7
    }
  },
  icon: {
    marginLeft: theme.spacing(1.5),
    marginBottom: theme.spacing(-0.5)
  },
  path: {
    fill: theme.palette.primary.main
  },
  paper: {
    width: '100%',
    padding: 16,
    maxWidth: 400,
    height: 700,
    overflow: 'scroll'
  }
}))
