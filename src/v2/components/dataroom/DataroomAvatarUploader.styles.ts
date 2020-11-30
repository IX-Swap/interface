import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    cursor: 'pointer',
    '&:hover $overlay': {
      display: 'flex'
    }
  },
  overlay: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  }
}))
