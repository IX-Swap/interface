import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0px 80px 80px ${
      theme.palette.mode === 'light'
        ? 'rgba(162, 172, 191, 0.16)'
        : 'rgba(14, 31, 63, 0.3)'
    }`,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  list: {
    minWidth: 292,
    padding: theme.spacing(0, 3, 1.5),
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  border: {
    height: 1,
    padding: theme.spacing(0, 3),
    backgroundColor:
      theme.palette.mode === 'light' ? theme.palette.secondary.light : '#1D3667'
  }
}))
