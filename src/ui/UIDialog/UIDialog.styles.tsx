import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  // eslint-disable-next-line
  const alertsPalette = theme.palette.alerts!

  return {
    btnWrapper: {
      width: '-webkit-fill-available'
    },
    iconWrapper: {
      position: 'absolute',
      right: 6,
      top: 6,
      marginLeft: '20px',
      '& .MuiSvgIcon-root': {
        width: '20px',
        height: '20px'
      }
    }
  }
})
