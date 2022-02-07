import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    opacity: 0.75,
    position: 'absolute',
    padding: theme.spacing(3),
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.backgrounds.default,
    zIndex: 1
  }
}))
