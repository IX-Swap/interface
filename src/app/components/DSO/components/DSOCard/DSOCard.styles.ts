import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: 200,
    height: '100%',

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  },
  capitalStructure: {
    position: 'absolute',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 132,
    height: 40,
    top: 0,
    right: 0,
    fontSize: '18px',
    fontWeight: 500,
    letterSpacing: 0,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.backgrounds.default
        : 'initial',

    [theme.breakpoints.up('md')]: {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.backgrounds.light
          : 'initial'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    padding: theme.spacing(4),
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'initial'
        : theme.palette.backgrounds.lighter
  }
}))
