import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  // eslint-disable-next-line
  const selectPalette = theme.palette.select!

  return {
    wrapper: {
      transform: 'none',
      position: 'static',
      marginBottom: 12,
      color: selectPalette.label,
      opacity: 0.7
    }
  }
})
