import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 200,
    height: '100%',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  }
}))
