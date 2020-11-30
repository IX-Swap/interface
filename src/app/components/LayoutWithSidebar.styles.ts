import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles({
  container: {
    position: 'relative',
    marginTop: -64,
    paddingTop: 64
  },
  sidebar: {
    zIndex: 10,
    width: 300,
    position: 'fixed',
    top: 64,
    left: 90,
    bottom: 0,
    backgroundColor: '#fafafa',
    overflow: 'hidden'
  },
  content: {
    paddingLeft: 300,
    width: '100%'
  }
})
