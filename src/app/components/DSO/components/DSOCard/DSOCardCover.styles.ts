import { Theme, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  introduction: {
    '& p': { margin: 0 }
  },
  logo: {
    border: '1px solid #eee'
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    letterSpacing: 0
  },
  cover: {
    overflow: 'hidden',
    maxWidth: 205,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.grey[100]
  }
}))
