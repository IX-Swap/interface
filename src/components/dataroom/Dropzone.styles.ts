import { makeStyles } from '@material-ui/core/styles'
import tinycolor from 'tinycolor2'

export const useStyles = makeStyles(theme => ({
  container: {
    outline: 'none',
    backgroundColor: theme.palette.backgrounds.secondary,
    label: {
      display: 'none'
    },
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tinycolor(theme.palette.backgrounds.secondary).darken(4).toHexString(),
    }
  },
  acceptedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  icon: {
    color: theme.palette.text.secondary
  }
}))
