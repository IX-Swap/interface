import makeStyles from '@mui/styles/makeStyles';
import BackgroundTopImage from 'assets/images/404-background-top.svg'
import BackgroundBottomImage from 'assets/images/404-background-bottom.svg'
import DotBlock from 'assets/icons/dot-block.svg'

export default makeStyles(theme => ({
  container: {
    position: 'relative',
    backgroundImage: `url("${BackgroundTopImage}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top right',
    backgroundColor: theme.palette.backgrounds.default,
    height: '100vh'
  },
  wrapper: {
    height: '100vh',
    padding: theme.spacing(0, 1),
    backgroundImage: `url("${BackgroundBottomImage}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom left'
  },
  topBlock: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: theme.spacing(5, 8, 5),
    boxSizing: 'border-box',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'calc(100% - 64px) 40px',
    backgroundImage: `url("${DotBlock}")`,
    [theme.breakpoints.down('sm')]: {
      backgroundImage: 'none'
    }
  },
  mainContent: {
    margin: 'auto',
    padding: theme.spacing(0, 3)
  },
  title: {
    fontSize: 48,
    [theme.breakpoints.down('sm')]: {
      fontSize: 32
    }
  },
  description: {
    maxWidth: 658,
    padding: theme.spacing(2, 0, 0),
    fontSize: 24,
    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },
  button: {
    fontSize: 20,
    padding: theme.spacing(1, 6),
    margin: theme.spacing(9, 0),
    color: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      padding: theme.spacing(1, 3)
    }
  },
  link: {
    fontSize: 18,
    color: theme.palette.getContrastText(theme.palette.backgrounds.default),
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  linkText: {
    margin: theme.spacing(0, 0, 0, 2)
  }
}))
