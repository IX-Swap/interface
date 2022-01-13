import { makeStyles } from '@material-ui/core/styles'
import EarthImage from '../../images/digital_earth.png'

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
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2),
      height: 'auto',
      marginLeft: 0
    }
  },
  wrapper: {
    width: '55%',
    minHeight: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  formContainer: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  background: {
    width: '45%',
    backgroundColor: theme.palette.backgrounds.alternative,
    paddingTop: theme.spacing(12.5),
    paddingBottom: theme.spacing(7.5),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  backgroundImage: {
    height: '100%',
    background: `radial-gradient(50.29% 51.61% at 13.59% 48.39%, rgba(0, 0, 0, 0) 46.41%, #000000 73.61%)`,
    backgroundPosition: 'center right',
    backgroundSize: 'cover',
    mixBlendMode: 'screen',
    backgroundImage: `url(${EarthImage})`
  },
  formWrapper: {
    position: 'relative',
    height: '100%',
    maxWidth: 480
  },
  logo: {
    position: 'absolute',
    left: 0,
    top: 33
  }
}))
