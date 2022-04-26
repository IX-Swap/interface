import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  return {
    btnWrapper: {
      width: '-webkit-fill-available'
    },
    iconWrapper: {
      position: 'absolute',
      right: 10,
      top: 10,
      marginLeft: 20,
      cursor: 'pointer'
    }
  }
})
