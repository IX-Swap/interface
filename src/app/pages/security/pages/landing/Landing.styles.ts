import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  subContent: { padding: theme.spacing(5, 5, 7, 5) },
  contentWrapper: {
    width: 800,
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,

    borderRadius: 16,
    boxShadow:
      theme.palette.mode === 'light'
        ? '0px 4px 62px rgba(170, 170, 170, 0.06)'
        : 'none',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      minWidth: '20rem',
      maxWidth: 'none'
    }
  },
  divider: {
    width: 'auto',
    height: '1px',
    opacity: 0.75,
    flex: 'none',
    background: '#DBE2EC',
    alignSelf: 'stretch',
    flexGrow: 0,
    margin: '28px 0px'
  }
}))
