import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: '50%',
    borderRadius: 0
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '55%',
    height: 352,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4, 5)
  },
  media: {
    height: 352,
    width: '45%',
    backgroundSize: 'cover'
  },
  title: {
    display: '-webkit-box',
    overflow: 'hidden',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    textOverflow: 'ellipsis',
    lineClamp: 4,
    boxOrient: 'vertical',
    lineHeight: '138%',
    marginBottom: theme.spacing(3)
  },
  description: {
    display: '-webkit-box',
    overflow: 'hidden',
    color: theme.palette.getContrastText(theme.palette.primary.main),
    textOverflow: 'ellipsis',
    lineClamp: 7,
    boxOrient: 'vertical',
    lineHeight: '138%'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
    textDecoration: 'underline',
    color: '#8DC2FF',
    stroke: '#8DC2FF'
  },
  linkText: {
    marginRight: theme.spacing(1)
  }
}))
