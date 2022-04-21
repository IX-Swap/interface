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
      right: 10,
      top: 10,
      marginLeft: '20px',
      cursor: 'pointer',

      '& .MuiSvgIcon-root': {
        width: '20px',
        height: '20px'
      }
    }
  }
})
