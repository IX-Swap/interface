import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {},
  title: {
    margin: 0,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '1.25em',
    textAlign: 'center'
  },
  content: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10)
  },
  actions: {
    margin: 0,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(6)
  }
}))
