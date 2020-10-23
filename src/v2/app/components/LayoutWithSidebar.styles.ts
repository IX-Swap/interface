import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles({
  container: {
    position: 'relative'
  },
  sidebar: {
    zIndex: 10,
    width: 300,
    position: 'fixed',
    top: 64,
    left: 90,
    bottom: 0,
    backgroundColor: '#fafafa',
    overflow: 'auto'
  },
  content: {
    paddingLeft: 300,
    width: '100%'
  }
})
