import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  button: {
    [theme.breakpoints.down('lg')]: {
      background: '#EDE7FF',
      padding: theme.spacing(0.25, 0.5)
    }
  }
}))
