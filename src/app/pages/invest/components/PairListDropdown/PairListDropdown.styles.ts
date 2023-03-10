import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  pairName: {
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.7
    }
  },
  icon: {
    marginBottom: theme.spacing(-0.5),
    marginRight: theme.spacing(1),
    borderRight: '1px solid #DBE2EC',
    width: '35px'
  },
  path: {
    fill: theme.palette.primary.main
  },
  paper: {
    width: '100%',
    padding: 16,
    maxWidth: 500,
    height: 700,
    overflow: 'scroll'
  }
}))
