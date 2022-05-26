import { alpha } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'

export const dialogWidth = 400

export const useStyles = makeStyles(theme => ({
  root: { pointerEvents: 'none' },
  backDrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1201,
    width: '100vw',
    height: '100vh',
    backgroundColor: alpha('#000', 0.5),
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  scrollPaper: {
    display: 'block',
    position: 'relative',
    pointerEvents: 'none'
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 0,
    zIndex: 1000,
    maxWidth: dialogWidth,
    textAlign: 'center',
    padding: theme.spacing(5),
    borderRadius: 8,
    pointerEvents: 'auto',
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: theme.palette.backgrounds.light
  },
  content: {
    margin: theme.spacing(0, 0, 3),
    padding: 0
  },
  title: {
    padding: 0,
    margin: theme.spacing(3, 0, 2)
  },
  actions: {
    padding: 0
  },
  paperShift: {
    right: 30
  },
  button: {
    width: '100%'
  }
}))
