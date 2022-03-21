import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      display: 'flex'
    },
    message: {
      width: 145
    },
    button: {
      marginRight: 14,
      marginLeft: 8,

      '&:first-of-type': {
        marginRight: 0,
        marginLeft: 14
      },

      '&:only-of-type': {
        marginRight: 14,
        marginLeft: 14
      }
    }
  }
})
