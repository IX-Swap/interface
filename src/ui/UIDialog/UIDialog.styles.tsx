import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  return {
    btnWrapper: {
      width: '-webkit-fill-available'
    },
    iconWrapper: {
      position: 'absolute',
      right: 45.25,
      top: 45.25,
      marginLeft: 20,
      cursor: 'pointer'
    },
    mobileWrapper: {
      position: 'absolute',
      right: 36.25,
      top: 23.25,
      marginLeft: 20,
      cursor: 'pointer'
    }
  }
})
