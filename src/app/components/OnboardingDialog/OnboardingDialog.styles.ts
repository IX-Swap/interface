import { alpha } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { drawerWidth } from 'app/components/OnboardingPanel/OnboardingPanel.styles'

export const useStyles = makeStyles(theme => ({
  root: { pointerEvents: 'none' },
  backDrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 800,
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
    top: 64,
    right: drawerWidth + 20,
    margin: 0,
    zIndex: 1000,
    maxWidth: 450,
    borderRadius: theme.shape.borderRadius,
    pointerEvents: 'auto',
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    backgroundColor: theme.palette.backgrounds.light
  },
  paperShift: {
    right: 30
  },
  button: {
    color: theme.palette.sidebar.activeColor
  }
}))
