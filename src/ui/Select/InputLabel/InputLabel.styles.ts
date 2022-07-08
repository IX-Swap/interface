import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  const selectPalette = theme.palette.select

  return {
    wrapper: {
      transform: 'none',
      position: 'static',
      marginBottom: theme.spacing(1.5),
      color: selectPalette.label,
      opacity: 1,
      lineHeight: 1.13,
      '&.Mui-disabled': {
        color: theme.palette.text.secondary,
        opacity: 0.7
      }
    }
  }
})
