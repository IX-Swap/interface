import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.notificationsDropdown.bg,
    borderRadius: '0px 0px 8px 8px'
  },
  topBlock: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.25, 2, 1.25, 3),
    borderBottom: `1px solid ${theme.palette.notificationsDropdown.divider}`
  },
  bottomBlock: {
    padding: theme.spacing(0.5, 0),
    marginTop: -1,
    zIndex: 2,
    borderTop: `1px solid ${theme.palette.notificationsDropdown.divider}`
  },
  list: {
    position: 'relative',
    width: 375,
    height: 'max-content'
  }
}))
