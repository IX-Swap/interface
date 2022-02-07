import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(() => ({
  showPasswordButton: {
    paddingLeft: 0,
    paddingRight: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}))
