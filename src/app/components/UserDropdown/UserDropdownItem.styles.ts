import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  iconWrapper: {
    justifyContent: 'flex-start'
  },
  icon: {
    width: 25,
    height: 25,
    color: theme.palette.text.secondary
  }
}))
