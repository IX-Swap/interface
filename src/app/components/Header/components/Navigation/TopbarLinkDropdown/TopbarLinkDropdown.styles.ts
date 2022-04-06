import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex'
  },
  paper: {
    marginTop: '0!important',
    padding: '0!important',
    borderTopRightRadius: '0!important',
    borderTopLeftRadius: '0!important',
    top: '81px!important',
    boxShadow: `0px 80px 80px ${
      theme.palette.mode === 'light'
        ? 'rgba(162, 172, 191, 0.16)'
        : 'rgba(14, 31, 63, 0.3)'
    }`,
    border: `1px solid ${
      theme.palette.mode === 'light' ? '#EDF2FA' : '#1D3667'
    }`
  },
  list: { padding: 0 },
  navItem: {
    position: 'relative',
    minWidth: 266,
    height: 'max-content',
    padding: theme.spacing(0),

    '&:hover': {
      background: 'initial'
    }
  },
  line: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    // eslint-disable-next-line
    width: `calc(100% - ${theme.spacing(4)})`,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.secondary.light
        : '#1D3667',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
  }
}))
