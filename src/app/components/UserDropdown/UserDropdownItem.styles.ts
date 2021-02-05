import { makeStyles } from '@material-ui/core/styles'

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
