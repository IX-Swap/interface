import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    border: `1px solid ${theme.palette.divider}`,
    maxWidth: `calc(100vw - 16px)`
  },
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
    backgroundColor: theme.palette.backgrounds.light
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
