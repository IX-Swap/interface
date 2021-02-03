import { makeStyles } from '@material-ui/core/styles'

export const useStlyes = makeStyles(theme => ({
  container: {
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: theme.palette.background.default
  }
}))
