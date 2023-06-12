import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  iconButton: {
    padding: 2,
    '&:hover': {
      borderRadius: '100%'
    }
  }
}))
