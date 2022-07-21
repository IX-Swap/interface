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
  padded: {
    position: `relative`,
    border: 'none',
    paddingTop: 24,
    paddingBottom: 24,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxHeight: 120,
      paddingTop: 30,
      paddingBottom: 30
    }
  },
  wrapper: {
    background: theme.palette.header.bg
  },
  title: {
    fontSize: 24,
    height: 29
  },
  crumbs: {
    height: 24
  }
}))
