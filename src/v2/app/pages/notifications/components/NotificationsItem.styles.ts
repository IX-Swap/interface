import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme => ({
  container: {},
  inner: {
    padding: '10px 14px',
    minHeight: 65,
    flexWrap: 'nowrap'
  },
  content: {
    paddingLeft: 14,
    paddingRight: 14,
    overflow: 'hidden',
    flex: '1 1 0'
  },
  unread: {
    backgroundColor: '#fafafa',
    borderColor: '#eeeeee'
  },
  icon: {
    '& svg': {
      width: 40,
      height: 40
    }
  },
  markRead: {
    width: 10,
    height: 10,
    background: '#e3e3e3',
    minWidth: 0,
    padding: 0
  },
  actions: {
    width: 60
  }
}))
