import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  contentWrapper: {
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4.5, 5.5, 4.5, 5),
    borderRadius: 16,
    boxShadow:
      theme.palette.mode === 'light'
        ? '0px 4px 62px rgba(170, 170, 170, 0.06)'
        : 'none'
  },
  web: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  mobile: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}))
