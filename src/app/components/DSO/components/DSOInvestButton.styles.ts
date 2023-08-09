import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    '&.Mui-disabled': {
      background: 'gray',
      color: 'black'
    }
  }
}))
