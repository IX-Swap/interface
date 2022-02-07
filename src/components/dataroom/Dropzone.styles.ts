import makeStyles from '@mui/styles/makeStyles'
import tinycolor from 'tinycolor2'

export const useStyles = makeStyles(theme => ({
  container: {
    outline: 'none',
    backgroundColor: theme.palette.backgrounds.light,
    label: {
      display: 'none'
    },
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tinycolor(theme.palette.backgrounds.light)
        .darken(4)
        .toHexString()
    },
    '& > div': {
      padding: 0
    }
  },
  acceptedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  icon: {
    color: theme.palette.text.secondary
  },
  bigIcon: {
    width: 96,
    height: 64,
    color: '#AAAAAA'
  }
}))
