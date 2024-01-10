import makeStyles from '@mui/styles/makeStyles'
import EarthImage from 'assets/images/digital_earth.png'
import { useServices } from 'hooks/useServices'

export const useStyles = makeStyles(theme => {
  const { sessionService } = useServices()

  const showEarthImage = ['', 'dev', 'staging', 'prime']
  const tenantCode: string = sessionService.get('tenantCode') ?? ''
  const overlayImage = showEarthImage.includes(tenantCode) ? EarthImage : ''

  return {
    container: {
      width: '100vw',
      minHeight: '100vh',
      background: `${theme.palette.backgrounds.alternative}`,
      backgroundSize: 'auto',
      backgroundPosition: '-35% center',
      position: 'relative',
      paddingTop: 0,
      paddingBottom: 0,
      [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(3, 2),
        height: 'auto',
        marginLeft: 0
      }
    },
    wrapper: {
      width: '20%',
      marginLeft: '10%',
      height: '100%',
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('lg')]: {
        marginLeft: 0,
        width: '100%',
        overflowY: 'scroll'
      }
    },
    formContainer: {
      marginTop: 'auto',
      marginBottom: 'auto',
      paddingTop: 50,
      paddingBottom: 50,
      [theme.breakpoints.down('lg')]: {
        paddingTop: 24,
        paddingBottom: 24
      }
    },
    background: {
      width: '60%',
      paddingTop: theme.spacing(12.5),
      paddingBottom: theme.spacing(7.5),
      backgroundColor: theme.palette.backgrounds.default,
      backgroundPosition: 'right center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100vh',
      [theme.breakpoints.down('lg')]: {
        display: 'none'
      }
    },
    backgroundImage: {
      height: '100%',
      mixBlendMode: 'screen',
      backgroundImage: `url(${overlayImage})`,
      backgroundPosition: '100% center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    },
    formWrapper: {
      position: 'relative',
      height: '100%',
      maxWidth: 480,
      minHeight: '100vh'
    },
    logo: {
      position: 'absolute',
      left: 0,
      top: 33,
      [theme.breakpoints.down('md')]: {
        top: 0
      }
    }
  }
})
