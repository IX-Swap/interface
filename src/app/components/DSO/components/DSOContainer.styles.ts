import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  subtitle: {
    color: theme.palette.text.secondary
  },
  button: {
    '&.Mui-disabled': {
      background: 'gray',
      color: 'black'
    }
  }
}))
