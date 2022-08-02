import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  button: {
    height: 33,
    margin: 0,
    marginRight: 5,
    padding: 0,
    '&:hover, &.Mui-disabled': {
      background: 'transparent'
    },
    '&.Mui-disabled': {
      color: theme.palette.iconButton.fillDisabled
    }
  }
}))
