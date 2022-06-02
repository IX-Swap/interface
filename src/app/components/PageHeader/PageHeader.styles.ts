import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  backButton: {
    position: 'relative',
    top: 2,
    marginRight: theme.spacing(0.5)
  },
  header: {
    marginBottom: 8
  },
  container: {
    marginBottom: theme.spacing(3)
  },
  noMargin: {
    margin: 0
  },
  wrapper: {
    position: `relative`,
    background: theme.palette.header.bg,
    border: 'none',
    marginTop: '1rem',
    marginBottom: '1rem',
    maxHeight: 120,
    paddingTop: 30,
    paddingBottom: 33,
    width: '100%',
    paddingLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      marginLeft: 0
    }
  },
  title: {
    fontSize: 24,
    height: 29
  },
  crumbs: {
    height: 24
  }
}))
