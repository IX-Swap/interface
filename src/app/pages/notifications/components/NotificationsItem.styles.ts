import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    // border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    maxWidth: `calc(100vw - 16px)`,
    padding: '8px 12px',
    boxShadow: '0px 24px 24px 0px #3B425114'
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
    },
    marginRight: 8
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
