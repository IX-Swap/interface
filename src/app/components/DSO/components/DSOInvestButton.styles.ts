import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  button: {
    '&.Mui-disabled': {
      background: 'gray',
      color: 'black'
    }
  }
}))
