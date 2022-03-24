import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(() => ({
  passwordField: {
    paddingRight: 0,
    '& .MuiOutlinedInput-root': {
      paddingRight: 0
    },
    '& .MuiInputBase-input input': {
      width: '100%'
    },
    '& .MuiInputAdornment-root': {
      marginLeft: '-35px'
    }
  },
  showPasswordButton: {
    paddingLeft: 0,
    paddingRight: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}))
