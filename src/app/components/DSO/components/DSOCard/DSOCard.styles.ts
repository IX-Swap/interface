import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    minHeight: 200
  },
  capitalStructure: {
    position: 'absolute',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 132,
    height: 40,
    top: 0,
    right: 0,
    fontSize: '18px',
    fontWeight: 500,
    letterSpacing: 0,
    backgroundColor: theme.palette.backgrounds.secondary
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    padding: theme.spacing(4)
  }
}))
