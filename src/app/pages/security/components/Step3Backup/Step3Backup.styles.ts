import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {
    maxWidth: 484,
    textAlign: 'center'
  },
  text: {
    margin: theme.spacing(2, 0, 27),
    fontSize: 16,
    fontWeight: 400,
    opacity: 0.8,

    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(3, 0, 5)
    }
  },
  secondText: {
    fontWeight: 400,
    marginTop: theme.spacing(27),
    opacity: 0.8,

    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(5)
    }
  }
}))
