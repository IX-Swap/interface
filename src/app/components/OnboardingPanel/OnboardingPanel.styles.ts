import makeStyles from '@mui/styles/makeStyles';
import tinycolor from 'tinycolor2'

export const drawerWidth = 250
const closedWidth = 30
const headerHeight = 64

export const useStyles = makeStyles(
  theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      paddingTop: headerHeight,
      overflowY: 'visible',
      zIndex: 900
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: closedWidth
    },
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginRight: -drawerWidth,
      overflowY: 'hidden'
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: 0
    },
    panel: {
      backgroundColor: theme.palette.backgrounds.light,
      padding: '20px 40px',
      width: drawerWidth,
      height: '100%',
      position: 'relative'
    },
    topPanel: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(3)
    },
    toggleButton: {
      position: 'absolute',
      top: 140,
      left: -20,
      width: 40,
      height: 40,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 20,
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.backgrounds.default
          : theme.palette.sidebar.activeColor,
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'light'
            ? tinycolor(theme.palette.backgrounds.default).darken(10)
            : tinycolor(theme.palette.sidebar.activeColor).lighten(10)
      }
    }
  }),
  { index: 1 }
)
