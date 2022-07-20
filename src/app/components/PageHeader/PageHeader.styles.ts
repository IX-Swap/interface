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
    paddingTop: 30,
    paddingBottom: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxHeight: 120
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
