import { makeStyles } from '@material-ui/core/styles'
import EarthImage from '../../images/digital_earth.png'

export const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    fontSize: 40,
    color: theme.palette.text.primary,
    textTransform: 'uppercase'
  },
  question: {
    color: 'rgba(255, 255, 255, 0.5)'
  },
  link: {
    color: theme.palette.text.primary
  },
  label: {
    display: 'block',
    maxWidth: 286,
    color: 'rgba(255, 255, 255, 0.5)'
  }
}))
