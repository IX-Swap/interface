import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: theme.palette.background.default
  }
}))
