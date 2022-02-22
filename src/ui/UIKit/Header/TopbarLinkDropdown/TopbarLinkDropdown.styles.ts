import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex'
  },
  menu: {
    top: 0
  },
  list: { padding: 0 },
  navItem: {
    position: 'relative',
    minWidth: 266,
    height: 'max-content',
    padding: theme.spacing(0)
  },

  line: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    // eslint-disable-next-line
    width: `calc(100% - ${theme.spacing(4)})`,
    backgroundColor: theme.palette.secondary.light,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  }
}))
