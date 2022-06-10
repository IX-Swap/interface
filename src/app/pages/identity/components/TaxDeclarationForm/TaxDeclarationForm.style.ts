import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {
    borderRadius: 8,
    padding: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2)
    }
  },
  header: {
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(4)
    }
  },
  taxDeclaration: {
    marginBottom: theme.spacing(3)
  }
}))
