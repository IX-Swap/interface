import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      borderRadius: 5,
      margin: '2rem',

      width: 'max-content',
      [theme.breakpoints.up('md')]: {
        padding: '2rem'
      }
    }
  },
  titleRoot: {
    paddingTop: 0,
    paddingBottom: 0.5,
    textAlign: 'center'
  },
  title: {
    fontWeight: 500,
    textTransform: 'none'
  }
}))
