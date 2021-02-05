import { fade } from '@material-ui/core/styles/colorManipulator'
import { makeStyles } from '@material-ui/core/styles'
import { drawerWidth } from 'app/components/OnboardingPanel/OnboardingPanel.styles'

export const useStyles = makeStyles(theme => ({
  backDrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 800,
    width: '100vw',
    height: '100vh',
    backgroundColor: fade('#000', 0.5),
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  scrollPaper: {
    display: 'block',
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    top: 64,
    right: drawerWidth,
    margin: 0,
    zIndex: 1000,
    maxWidth: 450,
    borderRadius: theme.shape.borderRadius
  },
  paperShift: {
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    right: 30
  }
}))
