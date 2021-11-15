import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  searchWrapper: {
    width: 300
  }
}))
