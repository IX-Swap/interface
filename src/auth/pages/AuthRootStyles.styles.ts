import makeStyles from '@mui/styles/makeStyles'
import EarthImage from 'assets/images/digital_earth.png'
import DotsImage from 'assets/images/background_dots.png'

export const useStyles = makeStyles(theme => ({
  container: {
    width: '100vw',
    minHeight: '100vh',
    background: `radial-gradient(140.5% 224.8% at 149.5% 9.6%, rgba(65, 128, 255, 0.4) 1.56%, rgba(31, 106, 255, 0.4) 38.45%, rgba(0, 85, 255, 0) 100%), ${theme.palette.backgrounds.alternative}`,
    backgroundSize: 'auto',
    backgroundPosition: '-35% center',
    position: 'relative',
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3, 2),
      height: 'auto',
      marginLeft: 0
    }
  },
  wrapper: {
    width: '55%',
    position: 'relative',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      overflowY: 'scroll'
    }
  },
  formContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingTop: 72,
    paddingBottom: 64,
    [theme.breakpoints.down('md')]: {
      paddingTop: 24,
      paddingBottom: 24
    }
  },
  background: {
    width: '45%',
    paddingTop: theme.spacing(12.5),
    paddingBottom: theme.spacing(7.5),
    backgroundColor: '#0E1F42',
    backgroundImage: `url(${DotsImage})`,
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  backgroundImage: {
    height: '100%',
    mixBlendMode: 'screen',
    backgroundImage: `url(${EarthImage})`,
    backgroundPosition: '100% center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  formWrapper: {
    position: 'relative',
    height: '100%',
    maxWidth: 480
  },
  logo: {
    position: 'absolute',
    left: 0,
    top: 33,
    [theme.breakpoints.down('md')]: {
      top: 0
    }
  }
}))
