import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  spaced: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  spacedTop: {
    paddingTop: theme.spacing(3)
  },
  spacedBottom: {
    paddingBottom: theme.spacing(3)
  }
}))
