import makeStyles from '@mui/styles/makeStyles'
export const useStyles = makeStyles(theme => ({
  overlay: {
    width: '100%',
    height: 80,
    marginTop: -80,
    zIndex: 100,
    position: 'relative',
    pointerEvents: 'none',
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, rgba(19, 42, 87, 0) 0%, #132A57 100%)'
        : 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)'
  },
  button: {
    backgroundColor: theme.palette.button.bgLight,
    color: theme.palette.primary.main
  }
}))
