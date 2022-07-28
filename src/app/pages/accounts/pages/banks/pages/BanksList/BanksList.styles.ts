import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: 8
  },
  pageParent: {
    display: 'table',
    [theme.breakpoints.down('md')]: {}
  }
}))
