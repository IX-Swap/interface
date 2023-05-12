import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    padding: 0,
    [theme.breakpoints.down('lg')]: {
      padding: 24
    }
  },
  content: {
    width: '100%',
    padding: theme.spacing(2, 0),
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(2, 3)
    }
  }
}))
