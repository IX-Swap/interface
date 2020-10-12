import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 10,
    paddingRight: 90,
    minHeight: 65,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent'
  },
  unread: {
    backgroundColor: '#fafafa',
    borderColor: '#eeeeee'
  },
  icon: {
    minWidth: 60,

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
