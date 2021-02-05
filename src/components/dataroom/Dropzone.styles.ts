import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    outline: 'none',
    backgroundColor: theme.palette.backgrounds.secondary,
    label: {
      display: 'none'
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
