import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  button: {
    [theme.breakpoints.down('md')]: {
      background: '#EDE7FF',
      padding: theme.spacing(0.25, 0.5)
    }
  },
  toggleButton: {
    border: `1x solid ${theme.palette.primary.main}`,
    width: '100%',
    padding: theme.spacing(0.5, 0)
  }
}))
