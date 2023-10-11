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
    },
    orderHeadig: {
      color: '#3B4251',
      fontSize: '14px'
    },
    verticalLine: {
      display: 'block',
      height: '1px',
      border: '0px',
      borderTop: '1px solid #DBE2EC',
      margin: '1em 0px',
      padding: '0px'
    },
    orderItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }
})
