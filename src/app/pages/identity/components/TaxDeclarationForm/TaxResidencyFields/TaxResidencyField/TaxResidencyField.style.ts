import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {},
  block: {
    width: 'calc(50% - 44px)',
    marginRight: theme.spacing(2.5),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginRight: 0,
      marginTop: theme.spacing(4),

      '&:first-child': {
        marginTop: theme.spacing(1)
      }
    }
  },
  buttonBlock: {
    marginTop: theme.spacing(3)
  },
  deleteButton: {
    width: 48,
    height: 48,
    backgroundColor: `${
      theme.palette.mode === 'light' ? '#F7F9FA' : '#1D3667'
    }!important`,
    borderRadius: 8,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: theme.spacing(1, 0, 4)
    },

    '&.Mui-disabled': {
      opacity: theme.palette.mode === 'dark' ? 0.5 : 1,
      '& svg': {
        fill: '#496396'
      }
    }
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}))
